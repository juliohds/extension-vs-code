"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const vscode = require("vscode");
class FileGatherer {
    constructor() {
        this.config = vscode.workspace.getConfiguration("barrelr");
    }
    gather(directory) {
        return new Promise((resolve, reject) => {
            fs.readdir(directory, (err, files) => {
                if (err)
                    reject(err);
                else
                    resolve(this.produceBarreledNames(files, directory));
            });
        });
    }
    produceBarreledNames(files, directory) {
        const directories = [];
        const outputFiles = [];
        // Make this async
        files.filter(file => fs.statSync(`${directory}/${file}`).isDirectory())
            .forEach((directory) => {
            directories.push(this.produceBarellableName(directory, true));
        });
        // Make this async
        files.filter(file => fs.statSync(`${directory}/${file}`).isFile()
            && file !== "index.ts"
            && path.extname(file).match(new RegExp(`${this.getExtensionsRegEx()}`))
            && !file.match(this.getExcludeRegEx())).forEach((file) => {
            outputFiles.push(this.produceBarellableName(file, false));
        });
        return directories.concat(outputFiles);
    }
    produceBarellableName(name, directory) {
        if (directory) {
            return `./${path.basename(name)}`;
        }
        else {
            const regEx = new RegExp(`${this.getExtensionsRegEx()}`);
            return `./${path.basename(name.replace(regEx, ""))}`;
        }
    }
    getExcludeRegEx() {
        return this.config["excludeFileRegex"];
    }
    getExtensionsRegEx() {
        return this.config["fileExtensionRegex"];
    }
}
exports.default = FileGatherer;
//# sourceMappingURL=fileGatherer.js.map