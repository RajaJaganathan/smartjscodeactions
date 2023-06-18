/* eslint-disable @typescript-eslint/naming-convention */
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

import {
  isMapDeclaration,
  transformMapToObject,
} from "./code-actions/map-to-object";
import {
  isObjectDeclaration,
  transformObjectToMap,
} from "./code-actions/object-to-map";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "mycodeactions" is now active!');

  const disposable = vscode.languages.registerCodeActionsProvider(
    [
      { scheme: "file", language: "javascript" },
      { scheme: "file", language: "typescript" },
    ],
    {
      provideCodeActions(
        document: vscode.TextDocument,
        range: vscode.Range,
        context: vscode.CodeActionContext,
        token: vscode.CancellationToken
      ) {
        const selectedText = document.getText(range);

        if (isObjectDeclaration(selectedText)) {
          const transformAction = new vscode.CodeAction(
            "Transform Object to Map",
            vscode.CodeActionKind.Refactor
          );
          transformAction.command = {
            title: "Transform Object to Map",
            command: "extension.transformToMap",
            arguments: [document, range],
          };
          return [transformAction];
        } else if (isMapDeclaration(selectedText)) {
          const transformAction = new vscode.CodeAction(
            "Transform Map to Object",
            vscode.CodeActionKind.Refactor
          );
          transformAction.command = {
            title: "Transform Map to Object",
            command: "extension.transformToObject",
            arguments: [document, range],
          };
          return [transformAction];
        } 

        return [];
      },
    }
  );

  const transformMapDisposable = vscode.commands.registerTextEditorCommand(
    "extension.transformToMap",
    (textEditor, edit, document, range) => {
      const selectedText = document.getText(range);
      const transformedText = transformObjectToMap(selectedText);
      edit.replace(range, transformedText);
    }
  );

  context.subscriptions.push(disposable, transformMapDisposable);

  const transformObjectDisposable = vscode.commands.registerTextEditorCommand(
    "extension.transformToObject",
    (textEditor, edit, document, range) => {
      const selectedText = document.getText(range);
      const transformedText = transformMapToObject(selectedText);
      edit.replace(range, transformedText);
    }
  );

  context.subscriptions.push(disposable, transformObjectDisposable);

  
}

export function deactivate() {}
