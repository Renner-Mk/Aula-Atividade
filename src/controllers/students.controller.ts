import { Request, Response } from "express";

import repository from "../database/prisma.connection";
import { Student } from "../models/student.model";
import { StudentService } from "../services/student.service";

const studentService = new StudentService();
export class StudentController {
  //index -> lista todos os registros
  public async index(req: Request, res: Response) {
    try {
      const students = await studentService.getAllStudents();

      return res.status(200).json(students);
    } catch (error) {
      return res.status(500).json({
        success: false,
        code: res.statusCode,
        message: "Erro ao listar alunos",
      });
    }
  }
  //store -> criar um novo registro
  public async store(req: Request, res: Response) {
    try {
      const { name, email, password, type, age } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          code: res.statusCode,
          message: "Preencha todos os campos obrigatórios",
        });
      }

      const student = await repository.student.findUnique({
        where: { email },
      });

      if (student) {
        return res.status(400).json({
          success: false,
          code: res.statusCode,
          message: "Email ja cadastrado",
        });
      }

      const newStudent = new Student(name, email, password, type, age);

      const createdStudent = await studentService.createStudent(newStudent);

      return res.status(201).json(createdStudent);
    } catch (error) {
      return res.status(500).json({
        success: false,
        code: res.statusCode,
        message: `Erro ao cadastrar Aluno ${error}`,
      });
    }
  }
  //show -> pega os detalhes de um registro
  public async show(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const student = await studentService.getStudentById(id);

      if (!student) {
        return res.status(404).json({
          success: false,
          code: res.statusCode,
          message: "Aluno não encontrado",
        });
      }

      return res.status(200).json(student);
    } catch (error) {
      return res.status(500).json({
        success: false,
        code: res.statusCode,
        message: "Erro ao listar alunos",
      });
    }
  }
  //update -> atualizar um registro
  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, password, age } = req.body;

      const updatedStudent = await studentService.updateStudent({
        id,
        name,
        email,
        password,
        age,
      });

      return res.status(200).json(updatedStudent);
    } catch (error) {
      return res.status(500).json({
        success: false,
        code: res.statusCode,
        message: "Erro ao atualizar aluno",
      });
    }
  }
  //delete -> remove um registro
  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const student = await studentService.deleteStudent(id);

      return res.status(200).json(student);
    } catch (error) {
      return res.status(500).json({
        success: false,
        code: res.statusCode,
        message: "Erro ao deletar aluno",
      });
    }
  }
}
