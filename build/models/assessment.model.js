"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assessment = void 0;
const crypto_1 = require("crypto");
class Assessment {
    constructor(_discipline, _grade, _studentId) {
        this._discipline = _discipline;
        this._grade = _grade;
        this._studentId = _studentId;
        this._id = (0, crypto_1.randomUUID)();
    }
    get id() {
        return this._id;
    }
    get discipline() {
        return this._discipline;
    }
    get grade() {
        return this._grade;
    }
    get studentId() {
        return this._studentId;
    }
}
exports.Assessment = Assessment;
