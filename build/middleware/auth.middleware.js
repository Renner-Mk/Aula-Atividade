"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = validateToken;
const prisma_connection_1 = require("../database/prisma.connection");
function validateToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { authorization } = req.headers;
            const { studentId } = req.params;
            if (!authorization) {
                return res.status(401).json({
                    success: false,
                    code: res.statusCode,
                    message: `Token não informado`
                });
            }
            const student = yield prisma_connection_1.repository.student.findUnique({
                where: { id: studentId }
            });
            if (!student || (student.token !== authorization)) {
                return res.status(401).json({
                    success: false,
                    code: res.statusCode,
                    message: `Estudante não encontrado`
                });
            }
            next();
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: `Erro ao validar Aluno ${error}`
            });
        }
    });
}
