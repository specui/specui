import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import * as yaml from 'yaml';

export function openSpecEditorCommand(context: vscode.ExtensionContext) {
  return () => {
    let isInitialized = false;

    const panel = vscode.window.createWebviewPanel(
      'specUIEditor',
      'Spec Editor',
      vscode.ViewColumn.One,
      { enableScripts: true },
    );

    panel.webview.html = getWebviewContent(context, panel);

    panel.webview.onDidReceiveMessage(
      (message) => {
        if (!isInitialized) {
          return;
        }
        if (message.type === 'updateSpec') {
          saveSpecToFile(message.spec);
        }
      },
      undefined,
      context.subscriptions,
    );

    panel.onDidChangeViewState(() => {
      if (panel.visible) {
        loadSpecFromFile(panel);
        isInitialized = true;
      }
    });
  };

  function getWebviewContent(context: vscode.ExtensionContext, panel: vscode.WebviewPanel): string {
    const reactAppPathOnDisk = vscode.Uri.file(
      path.join(context.extensionPath, 'bundle', 'editor.js'),
    );

    const reactAppUri = panel.webview.asWebviewUri(reactAppPathOnDisk);

    const tailwindCssUri = panel.webview.asWebviewUri(
      vscode.Uri.file(path.join(context.extensionPath, 'bundle', 'editor.css')),
    );

    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <link rel="stylesheet" href="${tailwindCssUri}">
        </head>
        <body>
          <div id="root"></div>
          <script src="${reactAppUri}"></script>
        </body>
      </html>
    `;
  }
}

function loadSpecFromFile(panel: vscode.WebviewPanel) {
  const workspacePath = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
  if (workspacePath) {
    const specPath = path.join(workspacePath, '.specui', 'spec.yml');

    if (existsSync(specPath)) {
      const specYaml = readFileSync(specPath, 'utf8');
      const spec = yaml.parse(specYaml);

      panel.webview.postMessage({ type: 'loadSpec', spec });
    } else {
      vscode.window.showWarningMessage('No spec.yml file found in .specui directory.');
    }
  }
}

function saveSpecToFile(spec: any) {
  const workspacePath = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
  if (workspacePath) {
    const specPath = path.join(workspacePath, '.specui', 'spec.yml');
    const specYaml = yaml.stringify(spec);

    mkdirSync(path.dirname(specPath), { recursive: true });

    writeFileSync(specPath, specYaml, 'utf8');
    vscode.window.showInformationMessage('Spec saved to .specui/spec.yml');
  }
}
