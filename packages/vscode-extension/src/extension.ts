import * as vscode from 'vscode';

import { isSpecFile } from './utils/isSpecFile';
import { registerCommands } from './utils/registerCommands';

export function activate(context: vscode.ExtensionContext) {
  // Register all commands from the commands directory
  registerCommands();

  // Create the status bar item
  const specUIStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100,
  );
  specUIStatusBarItem.text = '$(rocket) SpecUI';
  specUIStatusBarItem.tooltip = 'Click to open spec';
  specUIStatusBarItem.command = 'SpecUI.openSpec';
  specUIStatusBarItem.show();

  const documentChangeListener = vscode.workspace.onDidChangeTextDocument((event) => {
    const document = event.document;

    if (isSpecFile(document)) {
      document.save();
    }
  });

  const documentSaveListener = vscode.workspace.onDidSaveTextDocument((document) => {
    if (isSpecFile(document)) {
      vscode.commands.executeCommand('SpecUI.saveSpec');
    }
  });

  context.subscriptions.push(specUIStatusBarItem);
  context.subscriptions.push(documentChangeListener);
  context.subscriptions.push(documentSaveListener);
}

// This method is called when your extension is deactivated
export function deactivate() {}
