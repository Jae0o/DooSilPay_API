import { StudentRepository } from 'repositories';

import { ensureStudent } from '../ensureStudent';

export const deleteStudent = (uid: string, id: string) => StudentRepository.softDelete(uid, id).then(ensureStudent);
