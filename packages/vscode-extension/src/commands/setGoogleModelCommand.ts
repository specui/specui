import * as vscode from 'vscode';

export async function setGoogleModelCommand() {
  const model = await vscode.window.showInputBox({
    prompt: 'Enter your Google Model',
    ignoreFocusOut: true,
    placeHolder: 'gemini-1.5-flash-latest',
  });

  if (!model) {
    vscode.window.showWarningMessage('No Google Model provided. Operation cancelled.');
    return;
  }

  await vscode.workspace.getConfiguration().update('SpecUI.ai.google.model', model, vscode.ConfigurationTarget.Global);

  vscode.window.showInformationMessage('Google Model saved successfully.');
}
