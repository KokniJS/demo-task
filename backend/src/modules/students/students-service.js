const { ApiError, sendAccountVerificationEmail } = require('../../utils');
const {
  findAllStudents,
  findStudentDetail,
  findStudentToSetStatus,
  addOrUpdateStudent,
} = require('./students-repository');
const { findUserById } = require('../../shared/repository');

const checkStudentId = async (id) => {
  const isStudentFound = await findUserById(id);
  if (!isStudentFound) {
    throw new ApiError(404, 'Student not found');
  }
};

const getAllStudents = async (payload) => {
  if (!payload || typeof payload !== 'object') {
    throw new ApiError(400, 'Invalid payload structure');
  }

  const students = await findAllStudents(payload);
  if (students.length <= 0) {
    throw new ApiError(404, 'Students not found');
  }

  return students;
};

const getStudentDetail = async (id) => {
  if (!id || (typeof id !== 'string' && typeof id !== 'number')) {
    throw new ApiError(400, 'Invalid student ID format');
  }

  await checkStudentId(id);

  const student = await findStudentDetail(id);
  if (!student) {
    throw new ApiError(404, 'Student not found');
  }

  return student;
};

const addNewStudent = async (payload) => {
  if (!payload || !payload.name || !payload.email) {
    throw new ApiError(400, 'Name and email are required fields');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(payload.email)) {
    throw new ApiError(400, 'Invalid email format');
  }

  const ADD_STUDENT_AND_EMAIL_SEND_SUCCESS = 'Student added and verification email sent successfully.';
  const ADD_STUDENT_AND_BUT_EMAIL_SEND_FAIL = 'Student added, but failed to send verification email.';
  try {
    const result = await addOrUpdateStudent(payload);
    if (!result.status) {
      throw new ApiError(500, result.message);
    }

    try {
      await sendAccountVerificationEmail({ userId: result.userId, userEmail: payload.email });
      return { message: ADD_STUDENT_AND_EMAIL_SEND_SUCCESS };
    } catch (error) {
      return { message: ADD_STUDENT_AND_BUT_EMAIL_SEND_FAIL };
    }
  } catch (error) {
    throw new ApiError(500, 'Unable to add student');
  }
};

const updateStudent = async (payload) => {
  // Validate required fields
  if (!payload || !payload.id) {
    throw new ApiError(400, 'Student ID is required for update');
  }

  // Validate email format if provided
  if (payload.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email)) {
      throw new ApiError(400, 'Invalid email format');
    }
  }

  const result = await addOrUpdateStudent(payload);
  if (!result.status) {
    throw new ApiError(500, result.message);
  }

  return { message: result.message };
};

const setStudentStatus = async ({ userId, reviewerId, status }) => {
  // Validate required fields
  if (!userId) {
    throw new ApiError(400, 'User ID is required');
  }

  if (typeof status !== 'boolean') {
    throw new ApiError(400, 'Status must be a boolean value');
  }

  await checkStudentId(userId);

  const affectedRow = await findStudentToSetStatus({ userId, reviewerId, status });
  if (affectedRow <= 0) {
    throw new ApiError(500, 'Unable to change student status');
  }

  return { message: 'Student status changed successfully' };
};

module.exports = {
  getAllStudents,
  getStudentDetail,
  addNewStudent,
  setStudentStatus,
  updateStudent,
};
