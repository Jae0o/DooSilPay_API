import type { z } from 'zod';

import type { updateStudentStatusSchema } from './updateStudentStatus.validation';

export type UpdateStudentStatusInput = z.infer<typeof updateStudentStatusSchema>;
