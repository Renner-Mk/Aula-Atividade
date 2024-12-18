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
exports.AuthController = void 0;
const prisma_connection_1 = require("../database/prisma.connection");
const crypto_1 = require("crypto");
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    return res.status(400).json({
                        success: false,
                        code: res.statusCode,
                        message: "Todos os campos são obrigatorios"
                    });
                }
                const student = yield prisma_connection_1.repository.student.findFirst({
                    where: {
                        email, password
                    },
                    select: {
                        id: true,
                        name: true,
                        age: true,
                        email: true
                    }
                });
                if (!student) {
                    return res.status(401).json({
                        success: false,
                        code: res.statusCode,
                        message: "Credenciais invalidas"
                    });
                }
                const token = (0, crypto_1.randomUUID)();
                yield prisma_connection_1.repository.student.update({
                    where: { id: student.id },
                    data: {
                        token
                    }
                });
                return res.status(200).json({
                    success: true,
                    code: res.statusCode,
                    message: "Login efetuado com sucesso!",
                    data: Object.assign(Object.assign({}, student), { token })
                });
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    code: res.statusCode,
                    message: `Erro ao autenticar ${error}`
                });
            }
        });
    }
}
exports.AuthController = AuthController;
