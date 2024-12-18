import { NextFunction, Request, Response } from "express";
import { repository } from "../database/prisma.connection";

export async function validateToken(req:Request, res:Response, next: NextFunction){
    try {
        const { authorization } = req.headers
        const { studentId } = req.params

        if(!authorization){
            return res.status(401).json({
                success: false,
                code: res.statusCode,
                message: `Token não informado`
            })
        }

        const student = await repository.student.findUnique({
            where: {id: studentId}
        })

        if(!student || (student.token !== authorization)){
            return res.status(401).json({
                success: false,
                code: res.statusCode,
                message: `Estudante não encontrado`
            })
        }

        next()
    } catch (error) {
        return res.status(500).json({
            success: false,
            code: res.statusCode,
            message: `Erro ao validar Aluno ${error}`
        })
    }
}