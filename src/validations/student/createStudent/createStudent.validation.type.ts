import type { z } from 'zod';

import type { createStudentSchema } from './createStudent.validation';

export type CreateStudentInput = z.infer<typeof createStudentSchema>;
