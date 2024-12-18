import { Request, Response } from "express";
import { repository } from "../database/prisma.connection";

import { randomUUID } from "crypto";

export class AuthController {
    public async login(req:Request, res:Response){
        try {
            const {email, password} = req.body

            if(!email || !password){
                return res.status(400).json({
                    success: false,
                    code: res.statusCode,
                    message: "Todos os campos são obrigatorios"
                })
            }

            const student = await repository.student.findFirst({
                where: {
                    email, password
                },
                select:{
                    id: true,
                    name: true,
                    age: true,
                    email: true
                }
            })

            if(!student){
                return res.status(401).json({
                    success: false,
                    code: res.statusCode,
                    message: "Credenciais invalidas"
                })
            }

            const token = randomUUID()

            await repository.student.update({
                where:{ id: student.id },
                data:{
                    token
                }
            })


            return res.status(200).json({
                success: true,
                code: res.statusCode,
                message: "Login efetuado com sucesso!",
                data: {
                    ...student,
                    token
                }
            })


        } catch (error) {
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: `Erro ao autenticar ${error}`
            })
        }
    }
}