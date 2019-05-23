"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const path = require("path");
const barrelr_1 = require("./barrelr");
function activate(context) {
    const barrelr = new barrelr_1.default();
    const barrel = vscode.commands.registerCommand("extension.barrel", (folder) => {
        const filePath = folder && folder.fsPath ? folder.fsPath : path.dirname(vscode.window.activeTextEditor.document.fileName);
        barrelr.barrel(filePath)
            .catch(err => {
            vscode.window.showErrorMessage(err);
        });
    });
    context.subscriptions.push(barrel);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map