import { Request, Response } from "express";

import { repository } from '../database/prisma.connection'
import { Student } from "../models/student.model";

export class StudentController {
    //index -> lista todos os registros
    public async index(req: Request, res: Response) {
        try {
            const students = await repository.student.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    age: true,
                }
            })
    
            return res.status(200).json({
                success: true,
                code: res.statusCode,
                message: 'Alunos listados com sucesso',
                data: students
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: 'Erro ao listar alunos'
            })
        }
    }
    //store -> criar um novo registro
    public async store(req: Request, res: Response){
        try {
            const {name, email, password, age} = req.body
    
            if(!name || !email || !password){
                return res.status(400).json({
                    success: false,
                    code: res.statusCode,
                    message: 'Preencha todos os campos obrigatórios'
                })
            }
    
            const student = await repository.student.findUnique({
                where: {email}
            })
    
            if(student){
                return res.status(400).json({
                    success: false,
                    code: res.statusCode,
                    message: 'Email ja cadastrado'
                })
            }

            const newStudent = new Student(name, email, password, age)
    
    
            const createdStudent = await repository.student.create({
                data:{
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
            })
    
            return res.status(201).json({
                success: true,
                code: res.statusCode,
                message: 'Aluno criado com sucesso',
                data: createdStudent
            })
    
        } catch (error) {
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: `Erro ao cadastrar Aluno ${error}`
            })
        }
    }
    //show -> pega os detalhes de um registro
    public async show(req: Request, res: Response){
        try {
            const { id } = req.params
    
            const student = await repository.student.findUnique({
                where: {id},
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: true,
                    age: true
                }
            })
    
            if(!student){
                return res.status(404).json({message: 'Aluno não encontrado'})
            }
    
            return res.status(200).json({
                success: true,
                code: res.statusCode,
                message: 'Alunos listados com sucesso',
                data: student
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: 'Erro ao listar alunos'
            })
        }
    }
    //update -> atualizar um registro
    public async update(req: Request, res: Response){
        try {
            const { id } = req.params
            const {name, email, password, age} = req.body
    
            const updatedStudent = await repository.student.update({
                where: {id},
                data:{
                    name,
                    email,
                    password,
                    age
                },
                select:{
                    id: true,
                    name: true,
                    email: true,
                    age: true,
                }
            })
    
            return res.status(200).json({
                success: true,
                code: res.statusCode,
                message: 'aluno alualizado com sucesso',
                data: updatedStudent
            })
    
        } catch (error) {
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: 'Erro ao atualizar aluno'
            })
        }
    }
    //delete -> remove um registro
    public async delete(req: Request, res: Response){
        try {
            const { id } = req.params
            
            const student = await repository.student.delete({
                where: {
                    id
                },
                select:{
                    id: true,
                    name: true,
                    email: true,
                    age: true
                    
                }
            })
    
            return res.status(200).json({
                success: true,
                code: res.statusCode,
                message: 'aluno deletado com sucesso',
                data: student
            })
    
        } catch (error) {
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: 'Erro ao deletar aluno'
            })
        }
    }
}

