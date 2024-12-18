"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const crypto_1 = require("crypto");
class Student {
    constructor(_nome, _email, _password, _age) {
        this._nome = _nome;
        this._email = _email;
        this._password = _password;
        this._age = _age;
        this._id = (0, crypto_1.randomUUID)();
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._nome;
    }
    get email() {
        return this._email;
    }
    get password() {
        return this._password;
    }
    get age() {
        return this._age;
    }
}
exports.Student = Student;
