"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const students_controller_1 = require("../controllers/students.controller");
const assessment_controller_1 = require("../controllers/assessment.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
const studentController = new students_controller_1.StudentController();
const assessmentController = new assessment_controller_1.AssessmentController();
router.get('/students', studentController.index); // lista totos
router.get('/students/:id', studentController.show); // lista expecifico
router.post('/students', studentController.store); // cria aluno
router.put('/students/:id', studentController.update); // atualiza
router.delete('/students/:id', studentController.delete); //deleta
router.get('/students/:studentId/assessments', auth_middleware_1.validateToken, assessmentController.index);
router.post('/students/:studentId/assessments', auth_middleware_1.validateToken, assessmentController.store);
router.get('/students/:studentId/assessments/:id', auth_middleware_1.validateToken, assessmentController.show);
router.put('/students/:studentId/assessments/:id', auth_middleware_1.validateToken, assessmentController.update);
router.delete('/students/:studentId/assessments/:id', auth_middleware_1.validateToken, assessmentController.delete);
exports.default = router;
