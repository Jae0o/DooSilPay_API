import { createStudent } from './createStudent';
import { deleteStudent } from './deleteStudent';
import { getStudent } from './getStudent';
import { listStudents } from './listStudents';
import { setStudentStatus } from './setStudentStatus';
import { updateStudent } from './updateStudent';

export const StudentService = {
  createStudent,
  listStudents,
  getStudent,
  updateStudent,
  setStudentStatus,
  deleteStudent,
};
