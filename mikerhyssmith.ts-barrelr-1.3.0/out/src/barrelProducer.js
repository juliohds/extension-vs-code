"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const vscode = require("vscode");
class BarrelProducer {
    constructor(directory, fileNames) {
        this.directory = directory;
        this.fileNames = fileNames;
        this.config = vscode.workspace.getConfiguration("barrelr");
    }
    produceBarrel() {
        const exportedFileNames = this.produceExports(this.fileNames);
        return this.writeFiles(exportedFileNames, this.directory);
    }
    produceExports(fileNames) {
        return fileNames.map(this.addExport, this);
    }
    writeFiles(exportedFileNames, directory) {
        return new Promise((resolve, reject) => {
            fs.writeFile(directory + "/index.ts", exportedFileNames.join(""), (err) => {
                if (err)
                    reject(err);
                else
                    resolve("Barrel written");
            });
        });
    }
    addExport(fileName) {
        const quotemark = this.getQuoteMark();
        const semiColon = this.getSemiColon();
        return `export * from ${quotemark}${fileName}${quotemark}${semiColon}\r\n`;
    }
    getQuoteMark() {
        if (this.config.useDoubleQuotes) {
            return "\"";
        }
        return "'";
    }
    getSemiColon() {
        if (this.config.useSemiColons) {
            return ";";
        }
        return "";
    }
}
exports.default = BarrelProducer;
//# sourceMappingURL=barrelProducer.js.map