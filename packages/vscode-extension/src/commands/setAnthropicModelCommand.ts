import * as vscode from 'vscode';

export async function setAnthropicModelCommand() {
  const model = await vscode.window.showInputBox({
    prompt: 'Enter your Anthropic Model',
    ignoreFocusOut: true,
    placeHolder: 'claude-3-haiku-20240307',
  });

  if (!model) {
    vscode.window.showWarningMessage('No Anthropic Model provided. Operation cancelled.');
    return;
  }

  await vscode.workspace.getConfiguration().update('SpecUI.ai.anthropic.model', model, vscode.ConfigurationTarget.Global);

  vscode.window.showInformationMessage('Anthropic Model saved successfully.');
}
