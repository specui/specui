import * as vscode from 'vscode';

export async function setOpenAiModelCommand() {
  const model = await vscode.window.showInputBox({
    prompt: 'Enter your OpenAI Model',
    ignoreFocusOut: true,
    placeHolder: 'gpt-4o',
  });

  if (!model) {
    vscode.window.showWarningMessage('No OpenAI Model provided. Operation cancelled.');
    return;
  }

  await vscode.workspace.getConfiguration().update('SpecUI.ai.openAi.model', model, vscode.ConfigurationTarget.Global);

  vscode.window.showInformationMessage('OpenAI Model saved successfully.');
}
