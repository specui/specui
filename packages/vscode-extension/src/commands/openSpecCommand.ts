import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { window, workspace } from 'vscode';

export async function openSpecCommand() {
  const workspaceFolders = workspace.workspaceFolders;

  if (!workspaceFolders) {
    window.showErrorMessage('Please open a workspace folder to use SpecUI.');
    return;
  }

  // Get the first workspace folder path
  const workspacePath = workspaceFolders[0].uri.fsPath;

  // Path to .specui/spec.yml
  const specFilePath = join(workspacePath, '.specui', 'spec.yml');

  // Check if the file exists, create it if not
  if (!existsSync(specFilePath)) {
    try {
      mkdirSync(join(workspacePath, '.specui'), { recursive: true });
      writeFileSync(specFilePath, '# SpecUI Configuration\n', { encoding: 'utf8' });
      window.showInformationMessage('Created .specui/spec.yml file.');
    } catch (error) {
      window.showErrorMessage(`Failed to create spec.yml: ${(error as Error).message}`);
      return;
    }
  }

  // Open the file in the editor
  const document = await workspace.openTextDocument(specFilePath);
  await window.showTextDocument(document);
}
