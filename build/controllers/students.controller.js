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
exports.StudentController = void 0;
const prisma_connection_1 = require("../database/prisma.connection");
const student_model_1 = require("../models/student.model");
class StudentController {
    //index -> lista todos os registros
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const students = yield prisma_connection_1.repository.student.findMany({
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        age: true,
                    }
                });
                return res.status(200).json({
                    success: true,
                    code: res.statusCode,
                    message: 'Alunos listados com sucesso',
                    data: students
                });
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    code: res.statusCode,
                    message: 'Erro ao listar alunos'
                });
            }
        });
    }
    //store -> criar um novo registro
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, age } = req.body;
                if (!name || !email || !password) {
                    return res.status(400).json({
                        success: false,
                        code: res.statusCode,
                        message: 'Preencha todos os campos obrigatórios'
                    });
                }
                const student = yield prisma_connection_1.repository.student.findUnique({
                    where: { email }
                });
                if (student) {
                    return res.status(400).json({
                        success: false,
                        code: res.statusCode,
                        message: 'Email ja cadastrado'
                    });
                }
                const newStudent = new student_model_1.Student(name, email, password, age);
                const createdStudent = yield prisma_connection_1.repository.student.create({
                    data: {
                        id: newStudent.id,
                        name: newStudent.name,
                        email: newStudent.email,
                        password: newStudent.password,
                        age: newStudent.age
                    },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        age: true,
                    }
                });
                return res.status(201).json({
                    success: true,
                    code: res.statusCode,
                    message: 'Aluno criado com sucesso',
                    data: createdStudent
                });
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    code: res.statusCode,
                    message: `Erro ao cadastrar Aluno ${error}`
                });
            }
        });
    }
    //show -> pega os detalhes de um registro
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const student = yield prisma_connection_1.repository.student.findUnique({
                    where: { id },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        password: true,
                        age: true
                    }
                });
                if (!student) {
                    return res.status(404).json({ message: 'Aluno não encontrado' });
                }
                return res.status(200).json({
                    success: true,
                    code: res.statusCode,
                    message: 'Alunos listados com sucesso',
                    data: student
                });
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    code: res.statusCode,
                    message: 'Erro ao listar alunos'
                });
            }
        });
    }
    //update -> atualizar um registro
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { name, email, password, age } = req.body;
                const updatedStudent = yield prisma_connection_1.repository.student.update({
                    where: { id },
                    data: {
                        name,
                        email,
                        password,
                        age
                    },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        age: true,
                    }
                });
                return res.status(200).json({
                    success: true,
                    code: res.statusCode,
                    message: 'aluno alualizado com sucesso',
                    data: updatedStudent
                });
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    code: res.statusCode,
                    message: 'Erro ao atualizar aluno'
                });
            }
        });
    }
    //delete -> remove um registro
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const student = yield prisma_connection_1.repository.student.delete({
                    where: {
                        id
                    },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        age: true
                    }
                });
                return res.status(200).json({
                    success: true,
                    code: res.statusCode,
                    message: 'aluno deletado com sucesso',
                    data: student
                });
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    code: res.statusCode,
                    message: 'Erro ao deletar aluno'
                });
            }
        });
    }
}
exports.StudentController = StudentController;
