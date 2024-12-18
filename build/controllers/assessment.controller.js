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
exports.AssessmentController = void 0;
const prisma_connection_1 = require("../database/prisma.connection");
const assessment_model_1 = require("../models/assessment.model");
class AssessmentController {
    //index -> lista avaliações
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { studentId } = req.params;
                const student = yield prisma_connection_1.repository.student.findUnique({
                    where: { id: studentId },
                    include: {
                        assessments: {
                            select: {
                                id: true,
                                discipline: true,
                                grade: true
                            }
                        }
                    }
                });
                if (!student) {
                    return res.status(404).json({
                        success: false,
                        code: res.statusCode,
                        message: "Aluno não encontrado"
                    });
                }
                return res.status(200).json({
                    success: true,
                    code: res.statusCode,
                    message: "Avaliações listadas com sucesso!",
                    data: student.assessments
                });
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    code: res.statusCode,
                    message: "Erro ao listar"
                });
            }
        });
    }
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { studentId } = req.params;
                const { discipline, grade } = req.body;
                const { authorization } = req.headers;
                if (!discipline || !grade) {
                    return res.status(400).json({
                        success: false,
                        code: res.statusCode,
                        message: "Os campos 'dicipline' e 'grade' são obrigatorios."
                    });
                }
                if (!authorization) {
                    return res.status(401).json({
                        success: false,
                        code: res.statusCode,
                        message: "Token não informado."
                    });
                }
                const student = yield prisma_connection_1.repository.student.findUnique({
                    where: { id: studentId },
                });
                if (!student) {
                    return res.status(404).json({
                        success: false,
                        code: res.statusCode,
                        message: "Aluno não encontrado."
                    });
                }
                if (student.token !== authorization) {
                    return res.status(401).json({
                        success: false,
                        code: res.statusCode,
                        message: "Token invalido."
                    });
                }
                const newAssessment = new assessment_model_1.Assessment(discipline, grade, studentId);
                const createdAssessment = yield prisma_connection_1.repository.assessment.create({
                    data: {
                        discipline: newAssessment.discipline,
                        grade: newAssessment.grade,
                        studentId: newAssessment.studentId
                    },
                    select: {
                        id: true,
                        discipline: true,
                        grade: true
                    }
                });
                return res.status(201).json({
                    success: true,
                    code: res.statusCode,
                    message: "Avaliação criada com sucesso.",
                    data: createdAssessment
                });
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    code: res.statusCode,
                    message: "Erro ao listar"
                });
            }
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { studentId, id } = req.params;
                const assessment = yield prisma_connection_1.repository.assessment.findFirst({
                    where: {
                        id,
                        studentId
                    },
                    select: {
                        id: true,
                        discipline: true,
                        grade: true
                    }
                });
                if (!assessment) {
                    return res.status(404).json({
                        success: false,
                        code: res.statusCode,
                        message: "Avaliação não encontrado."
                    });
                }
                return res.status(200).json({
                    success: false,
                    code: res.statusCode,
                    message: "Avaliação encontrada com sucesso!",
                    data: assessment
                });
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    code: res.statusCode,
                    message: "Erro ao listar"
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { studentId, id } = req.params;
                const { discipline, grade } = req.body;
                if (!discipline || !grade) {
                    return res.status(400).json({
                        success: false,
                        code: res.statusCode,
                        message: "Os campos 'dicipline' e 'grade' são obrigatorios."
                    });
                }
                const assessment = yield prisma_connection_1.repository.assessment.update({
                    where: {
                        id,
                        studentId
                    },
                    data: {
                        discipline,
                        grade
                    },
                    select: {
                        id: true,
                        discipline: true,
                        grade: true
                    }
                });
                if (!assessment) {
                    return res.status(404).json({
                        success: false,
                        code: res.statusCode,
                        message: "Avaliação não encontrado."
                    });
                }
                return res.status(200).json({
                    success: false,
                    code: res.statusCode,
                    message: "Avaliação atualizada com sucesso!",
                    data: assessment
                });
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    code: res.statusCode,
                    message: "Erro ao listar"
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { studentId, id } = req.params;
                const assessment = yield prisma_connection_1.repository.assessment.delete({
                    where: { studentId, id },
                    select: {
                        id: true,
                        discipline: true,
                        grade: true
                    }
                });
                if (!assessment) {
                    return res.status(404).json({
                        success: false,
                        code: res.statusCode,
                        message: "Avaliação não encontrado."
                    });
                }
                return res.status(200).json({
                    success: false,
                    code: res.statusCode,
                    message: "Avaliação deletada com sucesso!",
                    data: assessment
                });
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    code: res.statusCode,
                    message: "Erro ao listar"
                });
            }
        });
    }
}
exports.AssessmentController = AssessmentController;
