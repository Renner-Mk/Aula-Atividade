import express from "express";
import { StudentController } from "../controllers/students.controller";
import { AssessmentController } from "../controllers/assessment.controller";
import { validateToken } from "../middleware/auth.middleware";

const router = express.Router()

const studentController = new StudentController()
const assessmentController = new AssessmentController()


router.get('/students', studentController.index) // lista totos

router.get('/students/:id', studentController.show) // lista expecifico

router.post('/students', studentController.store) // cria aluno

router.put('/students/:id', studentController.update) // atualiza

router.delete('/students/:id', studentController.delete) //deleta

router.get('/students/:studentId/assessments', validateToken, assessmentController.index)

router.post('/students/:studentId/assessments', validateToken, assessmentController.store)

router.get('/students/:studentId/assessments/:id', validateToken, assessmentController.show)

router.put('/students/:studentId/assessments/:id', validateToken, assessmentController.update)

router.delete('/students/:studentId/assessments/:id', validateToken, assessmentController.delete)

export default router
