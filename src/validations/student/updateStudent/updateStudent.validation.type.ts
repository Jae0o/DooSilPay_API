import type { z } from 'zod';

import type { updateStudentSchema } from './updateStudent.validation';

export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;
