import * as fs from 'fs/promises';
import * as path from 'path';
import * as vscode from 'vscode';

import { systemPrompt } from '../prompts/system';
import { getAiModel } from '../utils/getAiModel';

import { saveSpecCommand } from './saveSpecCommand';
import { streamText } from 'ai';

export async function generateNewSpecCommand() {
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
    try {
      await fs.access(specFilePath);

      // Show a confirmation dialog if the file exists
      const userChoice = await vscode.window.showWarningMessage(
        `A spec.yml file already exists at ${specFilePath}. Do you want to overwrite it?`,
        { modal: true }, // Show as a modal dialog
        'Overwrite',
        'Cancel',
      );

      if (userChoice !== 'Overwrite') {
        vscode.window.showInformationMessage('Spec generation cancelled.');
        return; // Exit if the user cancels
      }
    } catch {
      // File doesn't exist, proceed with creation
    }

    // Ensure the .specui directory exists
    await vscode.workspace.fs.createDirectory(vscode.Uri.file(specDirPath));

    // Write the initial content to the file
    await fs.writeFile(
      specFilePath,
      `# Generated Spec\n# Prompt: ${prompt}\n# Model: ${model.modelId}\n\n# yaml-language-server: $schema=./schema.json\n`,
      'utf8',
    );

    // Call the AI API to generate the spec and stream the response
    const { textStream } = await streamText({
      model, // Replace with the desired model ID
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
    });

    // Stream the response data to the spec.yml file
    for await (const textPart of textStream) {
      // Append each chunk of content to the file as it is received
      await fs.appendFile(
        specFilePath,
        textPart.replace('```yaml', '').replace('yaml', '').replace('```', ''),
        'utf8',
      );
    }

    // Open the spec.yml file in the editor once streaming is complete
    const document = await vscode.workspace.openTextDocument(vscode.Uri.file(specFilePath));
    await vscode.window.showTextDocument(document);

    await saveSpecCommand();

    vscode.window.showInformationMessage(`Spec saved to ${specFilePath}`);
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to generate or save spec: ${(error as Error).message}`);
  }
}
