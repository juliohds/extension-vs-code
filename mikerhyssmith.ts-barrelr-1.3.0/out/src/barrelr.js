"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileGatherer_1 = require("./fileGatherer");
const barrelProducer_1 = require("./barrelProducer");
class Barrelr {
    constructor() {
        this.fileGatherer = new fileGatherer_1.default();
        this.BARREL_GLOB_ENDING = "\\*";
        this.RECURSIVE_BARREL_GLOB_ENDING = "\\**\\*";
    }
    barrel(fileLocation) {
        return this.fileGatherer.gather(fileLocation).then((result) => {
            this.barrelProducer = new barrelProducer_1.default(fileLocation, result);
            return this.barrelProducer.produceBarrel();
        });
    }
}
exports.default = Barrelr;
//# sourceMappingURL=barrelr.js.map