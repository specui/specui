import * as vscode from 'vscode';

export async function setAiProviderCommand() {
  const provider = await vscode.window.showInputBox({
    prompt: 'Select an AI provider',
    ignoreFocusOut: true,
    placeHolder: 'openAi',
  });

  if (!provider) {
    vscode.window.showWarningMessage('No AI Provider provided. Operation cancelled.');
    return;
  }

  await vscode.workspace.getConfiguration().update('SpecUI.ai.provider', provider, vscode.ConfigurationTarget.Global);

  vscode.window.showInformationMessage('AI Provider saved successfully.');
}
