import { generate } from '@specui/cli';
import * as vscode from 'vscode';

export async function saveSpecCommand() {
  // Get the first workspace folder directory
  const workspaceFolders = vscode.workspace.workspaceFolders;
  let dir: string | undefined;

  if (workspaceFolders && workspaceFolders.length > 0) {
    // Use the first workspace directory
    dir = workspaceFolders[0].uri.fsPath;
    console.log('Workspace directory:', dir);
  } else {
    // If no workspace is open, display an error message
    vscode.window.showErrorMessage(
      'No workspace folder is open. Please open a folder to use this command.',
    );
    return; // Exit the function if no workspace is open
  }

  try {
    // Call the generate function with the workspace directory
    const result = await generate({
      force: true,
      // delete: true,
      dir,
    });

    console.log(result);
  } catch (error) {
    console.error('Error generating:', error);
    vscode.window.showErrorMessage(
      `Failed to run the generate command: ${(error as Error).message}`,
    );
  }
}
