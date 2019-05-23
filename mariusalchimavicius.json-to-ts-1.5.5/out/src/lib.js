"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const os = require("os");
const copyPaste = require("copy-paste");
const UuidByString = require("uuid-by-string");
function getUserId() {
    const hostname = os.hostname();
    const { username } = os.userInfo();
    const platform = os.platform();
    const str = [hostname, username, platform].join("--");
    return UuidByString(str);
}
exports.getUserId = getUserId;
function getClipboardText() {
    try {
        return Promise.resolve(copyPaste.paste());
    }
    catch (error) {
        return Promise.reject(error);
    }
}
exports.getClipboardText = getClipboardText;
function handleError(error) {
    vscode_1.window.showErrorMessage(error.message);
}
exports.handleError = handleError;
function parseJson(json) {
    const tryEval = str => eval(`const a = ${str}; a`);
    try {
        return Promise.resolve(JSON.parse(json));
    }
    catch (ignored) {
    }
    try {
        return Promise.resolve(tryEval(json));
    }
    catch (error) {
        return Promise.reject(new Error('Selected string is not a valid JSON'));
    }
}
exports.parseJson = parseJson;
exports.logEvent = (visitor, eventAction) => (jsonString) => {
    const eventLabel = jsonString.slice(0, 250);
    visitor
        .event({
        eventCategory: "JSON transform",
        eventAction: eventAction,
        eventLabel: eventLabel
    }).send();
    return jsonString;
};
function getViewColumn() {
    const activeEditor = vscode_1.window.activeTextEditor;
    if (!activeEditor) {
        return vscode_1.ViewColumn.One;
    }
    switch (activeEditor.viewColumn) {
        case vscode_1.ViewColumn.One:
            return vscode_1.ViewColumn.Two;
        case vscode_1.ViewColumn.Two:
            return vscode_1.ViewColumn.Three;
    }
    return activeEditor.viewColumn;
}
exports.getViewColumn = getViewColumn;
function pasteToMarker(content) {
    const { activeTextEditor } = vscode_1.window;
    return activeTextEditor.edit((editBuilder) => {
        editBuilder.replace(activeTextEditor.selection, content);
        const { start } = activeTextEditor.selection;
    });
}
exports.pasteToMarker = pasteToMarker;
function getSelectedText() {
    const { selection, document } = vscode_1.window.activeTextEditor;
    return Promise.resolve(document.getText(selection).trim());
}
exports.getSelectedText = getSelectedText;
exports.validateLength = text => {
    if (text.length === 0) {
        return Promise.reject(new Error('Nothing selected'));
    }
    else {
        return Promise.resolve(text);
    }
};
//# sourceMappingURL=lib.js.map