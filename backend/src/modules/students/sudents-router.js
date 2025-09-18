const express = require('express');
const router = express.Router();
const studentController = require('./students-controller');
const { validateRequest } = require('../../utils/validate-request');
const {
  GetAllStudentsSchema,
  GetStudentDetailSchema,
  AddStudentSchema,
  UpdateStudentSchema,
  UpdateStudentStatusSchema,
} = require('./students-schema');

router.get('', validateRequest(GetAllStudentsSchema), studentController.handleGetAllStudents);
router.post('', validateRequest(AddStudentSchema), studentController.handleAddStudent);
router.get('/:id', validateRequest(GetStudentDetailSchema), studentController.handleGetStudentDetail);
router.post('/:id/status', validateRequest(UpdateStudentStatusSchema), studentController.handleStudentStatus);
router.put('/:id', validateRequest(UpdateStudentSchema), studentController.handleUpdateStudent);

module.exports = { studentsRoutes: router };
