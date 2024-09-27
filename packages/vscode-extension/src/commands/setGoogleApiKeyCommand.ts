import * as vscode from 'vscode';

export async function setGoogleApiKeyCommand() {
  const apiKey = await vscode.window.showInputBox({
    prompt: 'Enter your Google API Key',
    ignoreFocusOut: true,
    placeHolder: 'sk-...',
    password: true
  });

  if (!apiKey) {
    vscode.window.showWarningMessage('No Google API Key provided. Operation cancelled.');
    return;
  }

  await vscode.workspace.getConfiguration().update('SpecUI.ai.google.apiKey', apiKey, vscode.ConfigurationTarget.Global);

  vscode.window.showInformationMessage('Google API Key saved successfully.');
}
