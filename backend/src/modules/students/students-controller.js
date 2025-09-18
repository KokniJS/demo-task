const asyncHandler = require('express-async-handler');
const {
  getAllStudents,
  addNewStudent,
  getStudentDetail,
  setStudentStatus,
  updateStudent,
  removeStudent,
} = require('./students-service');

const handleGetAllStudents = asyncHandler(async (req, res) => {
  const { name, className, section, roll } = req.query;
  const payload = { name, className, section, roll };

  const students = await getAllStudents(payload);
  res.json({ students });
});

const handleAddStudent = asyncHandler(async (req, res) => {
  const payload = req.body;

  const result = await addNewStudent(payload);
  res.status(201).json(result);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const payload = { ...req.body, id };

  const result = await updateStudent(payload);
  res.json(result);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const student = await getStudentDetail(id);
  res.json({ student });
});

const handleStudentStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const reviewerId = req.user?.id || 1; // Fallback to 1 if no user in request

  const payload = { userId: id, reviewerId, status };
  const result = await setStudentStatus(payload);
  res.json(result);
});

const handleDeleteStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const result = await removeStudent(id);
  res.json(result);
});

module.exports = {
  handleGetAllStudents,
  handleGetStudentDetail,
  handleAddStudent,
  handleStudentStatus,
  handleUpdateStudent,
  handleDeleteStudent,
};
