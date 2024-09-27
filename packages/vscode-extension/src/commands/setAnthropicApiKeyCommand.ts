import * as vscode from 'vscode';

export async function setAnthropicApiKeyCommand() {
  const apiKey = await vscode.window.showInputBox({
    prompt: 'Enter your Anthropic API Key',
    ignoreFocusOut: true,
    placeHolder: 'sk-...',
    password: true
  });

  if (!apiKey) {
    vscode.window.showWarningMessage('No Anthropic API Key provided. Operation cancelled.');
    return;
  }

  await vscode.workspace.getConfiguration().update('SpecUI.ai.anthropic.apiKey', apiKey, vscode.ConfigurationTarget.Global);

  vscode.window.showInformationMessage('Anthropic API Key saved successfully.');
}
