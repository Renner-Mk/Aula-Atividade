import { Response } from "express";

export function missingFieldError(reponse: Response) {
    return reponse.status(400).json({
        sucess: false,
        message: 'Preencha os campos obrigatórios.'
    })
}

export function serverError(response: Response, error?: any) {
    return response.status(500).json({
        sucess: false,
        message: error ? error.toString() : 'Error genérico'
    })
}