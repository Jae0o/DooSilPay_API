import type { z } from 'zod';

import type { listStudentsQuerySchema } from './listStudents.validation';

export type ListStudentsQuery = z.infer<typeof listStudentsQuerySchema>;
