import * as vscode from 'vscode';

export async function setOpenAiApiKeyCommand() {
  const apiKey = await vscode.window.showInputBox({
    prompt: 'Enter your OpenAI API Key',
    ignoreFocusOut: true,
    placeHolder: 'sk-...',
    password: true
  });

  if (!apiKey) {
    vscode.window.showWarningMessage('No OpenAI API Key provided. Operation cancelled.');
    return;
  }

  await vscode.workspace.getConfiguration().update('SpecUI.ai.openAi.apiKey', apiKey, vscode.ConfigurationTarget.Global);

  vscode.window.showInformationMessage('OpenAI API Key saved successfully.');
}
