import * as vscode from 'vscode';

export async function setGroqModelCommand() {
  const model = await vscode.window.showInputBox({
    prompt: 'Enter your Groq Model',
    ignoreFocusOut: true,
    placeHolder: 'llama-3.1-8b-instant',
  });

  if (!model) {
    vscode.window.showWarningMessage('No Groq Model provided. Operation cancelled.');
    return;
  }

  await vscode.workspace.getConfiguration().update('SpecUI.ai.groq.model', model, vscode.ConfigurationTarget.Global);

  vscode.window.showInformationMessage('Groq Model saved successfully.');
}
