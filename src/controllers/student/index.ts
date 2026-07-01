import { deleteStudent } from './deleteStudent';
import { getStudent } from './getStudent';
import { getStudents } from './getStudents';
import { patchStudentStatus } from './patchStudentStatus';
import { postStudent } from './postStudent';
import { putStudent } from './putStudent';

export const StudentController = {
  postStudent,
  getStudents,
  getStudent,
  putStudent,
  patchStudentStatus,
  deleteStudent,
};
