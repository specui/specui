import * as fs from 'fs/promises';
import * as path from 'path';
import * as vscode from 'vscode';
import * as yaml from 'yaml'; // Using yaml package for parsing
import { getAiModel } from '../utils/getAiModel';
import { systemPrompt } from '../prompts/system';
import { saveSpecCommand } from './saveSpecCommand';
import { streamText } from 'ai';

// Function to set nested values using a path array
export function setNested(obj: any, path: (number | string)[], value: any): void {
  if (path.length === 0) {
    throw new Error('Path cannot be empty');
  }

  let current = obj;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];

    // If the key does not exist or is not an object, create an empty object
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {};
    }

    current = current[key];
  }

  // Set the value at the final key
  if (value === '<<<undefined>>>') {
    if (Array.isArray(current)) {
      current.splice(Number(path[path.length - 1]), 1);
    } else {
      delete current[path[path.length - 1]];
    }
  } else {
    current[path[path.length - 1]] = value;
  }
}

export async function generateModifiedSpecCommand() {
  const model = await getAiModel();

  // Prompt the user for a prompt to generate the spec
  const prompt = await vscode.window.showInputBox({
    placeHolder: 'Enter a prompt to generate a new spec',
    prompt: 'Describe the UI or functionality you want to generate',
    ignoreFocusOut: true,
  });

  if (!prompt) {
    vscode.window.showWarningMessage('No prompt entered. Spec generation cancelled.');
    return;
  }

  // Get the workspace folder path
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders || workspaceFolders.length === 0) {
    vscode.window.showErrorMessage(
      'No workspace folder is open. Please open a folder to save the spec.',
    );
    return;
  }
  const workspaceFolderPath = workspaceFolders[0].uri.fsPath;

  // Create the .specui directory path
  const specDirPath = path.join(workspaceFolderPath, '.specui');
  const specFilePath = path.join(specDirPath, 'spec.yml');

  try {
    // Ensure the .specui directory exists
    await vscode.workspace.fs.createDirectory(vscode.Uri.file(specDirPath));

    let existingYaml = '';

    // Check if the spec.yml file exists and read the current YAML if so
    try {
      existingYaml = await fs.readFile(specFilePath, 'utf8');
    } catch (error) {
      // If file doesn't exist, initialize it
      await fs.writeFile(
        specFilePath,
        `# Generated Spec\n# Prompt: ${prompt}\n# Model: ${model.modelId}\n\n# yaml-language-server: $schema=./schema.json\n`,
        'utf8',
      );
    }

    const document = await vscode.workspace.openTextDocument(vscode.Uri.file(specFilePath));

    // Parse the existing YAML
    const existingYamlObj = yaml.parse(existingYaml);

    // Call the AI API to generate the spec and stream the response
    const { textStream } = await streamText({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: `
Given the following YAML, please provide the necessary changes in the form of paths and their corresponding values. Each path should be an array representing the path to the element in the YAML structure, and the value should be the new value to be set at that path. If a value needs to be deleted, return \`"<<<undefined>>>"\` for that value.

Return the changes as a YAML array of objects, each with two fields:
- "path": an array representing the path to the element.
- "value": the new value to be set at the specified path.

Do not return the full YAML, only the paths and values for the changes.

The prompt: ${prompt}

The existing YAML:
${document.getText()}

Sample Output:
- path: ["name"]
  value: updated name
- path: ["components", "header", "elements", 0, "class"]
  value: ["bg-green-500", "p-4", "flex", "justify-between"]
`,
        },
      ],
    });

    // Process the stream incrementally
    let accumulatedResponse = '';

    for await (const textPart of textStream) {
      accumulatedResponse += textPart
        .replace('```yaml', '')
        .replace('yaml', '')
        .replace('```json', '')
        .replace('json', '')
        .replace('```', '');

      try {
        // Parse the incremental changes from the current response
        const changes = yaml.parse(accumulatedResponse);

        // Apply the changes using the setNested function
        for (const change of changes) {
          const { path, value } = change;
          setNested(existingYamlObj, path, value);
        }

        // Convert the updated YAML object back to a YAML string
        const updatedYaml = yaml.stringify(existingYamlObj);

        // Write the updated YAML back to the file after each change
        await fs.writeFile(specFilePath, updatedYaml, 'utf8');
      } catch (e) {
        // Ignore errors during partial parsing, as the full data might not have arrived yet
      }
    }

    // Once the stream has fully ended, update the final YAML
    const finalYaml = yaml.stringify(existingYamlObj);
    await fs.writeFile(specFilePath, finalYaml, 'utf8');

    // Open the spec.yml file in the editor once streaming is complete
    await vscode.window.showTextDocument(document);

    await saveSpecCommand();

    vscode.window.showInformationMessage(`Spec saved and updated in ${specFilePath}`);
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to generate or save spec: ${(error as Error).message}`);
  }
}
