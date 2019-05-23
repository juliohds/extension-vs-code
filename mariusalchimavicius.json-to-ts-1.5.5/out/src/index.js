"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const os = require("os");
const fs = require("fs");
const vscode_1 = require("vscode");
const json_to_ts_1 = require("json-to-ts");
const lib_1 = require("./lib");
const UA = require('universal-analytics');
const visitor = UA('UA-97872528-2', lib_1.getUserId());
function activate(context) {
    context.subscriptions.push(vscode_1.commands.registerCommand('jsonToTs.fromSelection', transformFromSelection));
    context.subscriptions.push(vscode_1.commands.registerCommand('jsonToTs.fromClipboard', transformFromClipboard));
}
exports.activate = activate;
function transformFromSelection() {
    const tmpFilePath = path.join(os.tmpdir(), 'json-to-ts.ts');
    const tmpFileUri = vscode_1.Uri.file(tmpFilePath);
    lib_1.getSelectedText()
        .then(lib_1.logEvent(visitor, 'Selection'))
        .then(lib_1.validateLength)
        .then(lib_1.parseJson)
        .then(json => {
        return json_to_ts_1.default(json)
            .reduce((a, b) => `${a}\n\n${b}`);
    })
        .then(interfaces => {
        fs.writeFileSync(tmpFilePath, interfaces);
    })
        .then(() => {
        vscode_1.commands.executeCommand('vscode.open', tmpFileUri, lib_1.getViewColumn());
    })
        .catch(lib_1.handleError);
}
function transformFromClipboard() {
    lib_1.getClipboardText()
        .then(lib_1.logEvent(visitor, 'Clipboard'))
        .then(lib_1.validateLength)
        .then(lib_1.parseJson)
        .then(json => {
        return json_to_ts_1.default(json)
            .reduce((a, b) => `${a}\n\n${b}`);
    })
        .then(interfaces => {
        lib_1.pasteToMarker(interfaces);
    })
        .catch(lib_1.handleError);
}
//# sourceMappingURL=index.js.map