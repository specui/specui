import * as vscode from 'vscode';

export async function setGroqApiKeyCommand() {
  const apiKey = await vscode.window.showInputBox({
    prompt: 'Enter your Groq API Key',
    ignoreFocusOut: true,
    placeHolder: 'sk-...',
    password: true
  });

  if (!apiKey) {
    vscode.window.showWarningMessage('No Groq API Key provided. Operation cancelled.');
    return;
  }

  await vscode.workspace.getConfiguration().update('SpecUI.ai.groq.apiKey', apiKey, vscode.ConfigurationTarget.Global);

  vscode.window.showInformationMessage('Groq API Key saved successfully.');
}
