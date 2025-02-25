import { Request, Response } from "express";
import { repository } from "../database/prisma.connection";
import { Assessment } from "../models/assessment.model";

export class AssessmentController{
    //index -> lista avaliações

    public async index(req:Request, res:Response){
        try {
            const { studentId } = req.params

            const student = await repository.student.findUnique({
                where:{ id: studentId },
                include: {
                    assessments: {
                        select: {
                            id: true,
                            discipline: true,
                            grade: true
                        }
                    }
                }
            })

            if(!student){
                return res.status(404).json({
                    success: false,
                    code: res.statusCode,
                    message: "Aluno não encontrado"
                })
            }


            return res.status(200).json({
                success: true,
                code: res.statusCode,
                message: "Avaliações listadas com sucesso!",
                data: student.assessments
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: "Erro ao listar"
            })
        }
    }

    public async store(req:Request, res:Response){
        try {
            const { studentId } = req.params
            const { discipline, grade } = req.body

            if(!discipline || !grade){
                return res.status(400).json({
                    success: false,
                    code: res.statusCode,
                    message: "Os campos 'dicipline' e 'grade' são obrigatorios."
                })
            }

            const student = await repository.student.findUnique({
                where: {id: studentId},
            })

            if(!student){
                return res.status(404).json({
                    success: false,
                    code: res.statusCode,
                    message: "Aluno não encontrado."
                })
            }

            const newAssessment = new Assessment(discipline, grade, studentId)

            const createdAssessment = await repository.assessment.create({
                data:{
                    discipline: newAssessment.discipline,
                    grade: newAssessment.grade,
                    studentId: newAssessment.studentId
                },
                select:{
                    id: true,
                    discipline: true,
                    grade: true
                }
            })

            return res.status(201).json({
                success: true,
                code: res.statusCode,
                message: "Avaliação criada com sucesso.",
                data: createdAssessment
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: "Erro ao listar"
            })
        }
    }

    public async show(req:Request, res:Response){
        try {
            const {studentId, id} = req.params

            const assessment = await repository.assessment.findFirst({
                where: {
                    id,
                    studentId
                },
                select: {
                    id: true,
                    discipline: true,
                    grade: true
                }
            })

            if(!assessment){
                return res.status(404).json({
                    success: false,
                    code: res.statusCode,
                    message: "Avaliação não encontrado."
                })
            }

            return res.status(200).json({
                success: false,
                code: res.statusCode,
                message: "Avaliação encontrada com sucesso!",
                data: assessment
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: "Erro ao listar"
            })
        }
    }

    public async update(req:Request, res:Response){
        try {
            const {studentId, id} = req.params

            const { discipline, grade } = req.body

            if(!discipline || !grade){
                return res.status(400).json({
                    success: false,
                    code: res.statusCode,
                    message: "Os campos 'dicipline' e 'grade' são obrigatorios."
                })
            }

            const assessment = await repository.assessment.update({
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
            })

            if(!assessment){
                return res.status(404).json({
                    success: false,
                    code: res.statusCode,
                    message: "Avaliação não encontrado."
                })
            }

            return res.status(200).json({
                success: false,
                code: res.statusCode,
                message: "Avaliação atualizada com sucesso!",
                data: assessment
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: "Erro ao listar"
            })
        }
    }

    public async delete(req:Request, res:Response){
        try {
            const {studentId, id} = req.params

            const assessment = await repository.assessment.delete({
                where: {studentId, id},
                select: {
                    id: true,
                    discipline: true,
                    grade: true
                }
            })

            if(!assessment){
                return res.status(404).json({
                    success: false,
                    code: res.statusCode,
                    message: "Avaliação não encontrado."
                })
            }

            return res.status(200).json({
                success: false,
                code: res.statusCode,
                message: "Avaliação deletada com sucesso!",
                data: assessment
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: "Erro ao listar"
            })
        }
    }
}