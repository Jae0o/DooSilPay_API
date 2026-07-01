import { StudentRepository } from 'repositories';
import type { UpdateStudentInput } from 'validations';

import { ensureStudent } from '../ensureStudent';

export const updateStudent = (uid: string, id: string, input: UpdateStudentInput) =>
  StudentRepository.update(uid, id, input).then(ensureStudent);
