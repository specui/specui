import { join } from 'path';
import { type TextDocument, workspace } from 'vscode';

export function isSpecFile(document: TextDocument): boolean {
  const workspaceFolders = workspace.workspaceFolders;
  if (!workspaceFolders) {
    return false;
  }

  const workspacePath = workspaceFolders[0].uri.fsPath;
  const specFilePath = join(workspacePath, '.specui', 'spec.yml');
  return document.uri.fsPath === specFilePath;
}
