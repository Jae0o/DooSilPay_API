import type { Student } from 'interfaces';

import { patchStudent } from '../patchStudent';

export const setStatus = (uid: string, id: string, status: Student['status']) => patchStudent(uid, id, { status });
