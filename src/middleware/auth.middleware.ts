import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService()

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

        const result = await authService.validateLogin(authorization, studentId)

        if(!result.success){
            return res.status(result.code)
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

// export async function validateLoginOlderAge(request: Request, response: Response, next: NextFunction) {
//     try {
//         const {studentId} = request.params
//         const result = await authService.validateLoginOlderAge(studentId)

//         if(!result.success){
//             return response.status(result.code).json(result)
//         }

//         next()
//     } catch (error) {
//         return response.status(500).json({
//             success: false,
//             code: response.statusCode,
//             message: `Erro ao validar Aluno ${error}`
//         })
//     }
// }