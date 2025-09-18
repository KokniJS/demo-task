const { z } = require('zod');

const GetAllStudentsSchema = z.object({
  query: z.object({
    name: z.string().optional(),
    className: z.string().optional(),
    section: z.string().optional(),
    roll: z.string().optional(),
  }),
});

const GetStudentDetailSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Student ID is required'),
  }),
});

const AddStudentSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
    phone: z.string().optional(),
    gender: z.enum(['male', 'female', 'other']).optional(),
    dob: z.string().optional(),
    className: z.string().optional(),
    section: z.string().optional(),
    roll: z.string().optional(),
    fatherName: z.string().optional(),
    fatherPhone: z.string().optional(),
    motherName: z.string().optional(),
    motherPhone: z.string().optional(),
    guardianName: z.string().optional(),
    guardianPhone: z.string().optional(),
    relationOfGuardian: z.string().optional(),
    currentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    admissionDate: z.string().optional(),
  }),
});

const UpdateStudentSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Student ID is required'),
  }),
  body: z.object({
    name: z.string().min(1, 'Name is required').optional(),
    email: z.string().email('Invalid email format').optional(),
    phone: z.string().optional(),
    gender: z.enum(['male', 'female', 'other']).optional(),
    dob: z.string().optional(),
    className: z.string().optional(),
    section: z.string().optional(),
    roll: z.string().optional(),
    fatherName: z.string().optional(),
    fatherPhone: z.string().optional(),
    motherName: z.string().optional(),
    motherPhone: z.string().optional(),
    guardianName: z.string().optional(),
    guardianPhone: z.string().optional(),
    relationOfGuardian: z.string().optional(),
    currentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    admissionDate: z.string().optional(),
  }),
});

const UpdateStudentStatusSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Student ID is required'),
  }),
  body: z.object({
    status: z.boolean('Status must be a boolean value'),
  }),
});

module.exports = {
  GetAllStudentsSchema,
  GetStudentDetailSchema,
  AddStudentSchema,
  UpdateStudentSchema,
  UpdateStudentStatusSchema,
};
