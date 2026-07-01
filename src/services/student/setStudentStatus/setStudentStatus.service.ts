import { StudentRepository } from 'repositories';

import { ensureStudent } from '../ensureStudent';

export const setStudentStatus = (uid: string, id: string, status: 'active' | 'inactive') =>
  StudentRepository.setStatus(uid, id, status).then(ensureStudent);
