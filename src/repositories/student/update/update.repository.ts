import type { UpdateStudentInput } from 'validations';

import { patchStudent } from '../patchStudent';

// registrationNo/status/deletedAt 불변(UpdateStudentInput에 필드 없음)
export const update = (uid: string, id: string, input: UpdateStudentInput) => patchStudent(uid, id, input);
