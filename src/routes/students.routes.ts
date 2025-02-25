import express from "express";
import { StudentController } from "../controllers/students.controller";
import { AssessmentController } from "../controllers/assessment.controller";
import { validateToken } from "../middleware/auth.middleware";
import { ValidateAuthorizationPermition } from "../middleware/authorization.middleware";
import { TypeStudent } from "../types";

const router = express.Router()

const studentController = new StudentController()
const assessmentController = new AssessmentController()


router.get('/students', studentController.index) // lista totos

router.get('/students/:id', studentController.show) // lista expecifico

router.post('/students', studentController.store) // cria aluno

router.put('/students/:id', studentController.update) // atualiza

router.delete('/students/:id', studentController.delete) //deleta

router.get('/students/:studentId/assessments', validateToken, assessmentController.index)

// router.post('/students/:studentId/assessments', validateToken, ValidateCreateAssessment, assessmentController.store)

router.post('/students/:studentId/assessments', validateToken, ValidateAuthorizationPermition([TypeStudent.Registered, TypeStudent.TechHelper]), assessmentController.store)

router.get('/students/:studentId/assessments/:id', validateToken, assessmentController.show)

// router.put('/students/:studentId/assessments/:id', validateToken, ValidateUpdateDeleteAssessment, assessmentController.update)

router.put('/students/:studentId/assessments/:id', validateToken, ValidateAuthorizationPermition([TypeStudent.TechHelper]), assessmentController.update)


// router.delete('/students/:studentId/assessments/:id', validateToken, ValidateUpdateDeleteAssessment, assessmentController.delete)

router.delete('/students/:studentId/assessments/:id', validateToken, ValidateAuthorizationPermition([TypeStudent.TechHelper]), assessmentController.delete)

export default router
