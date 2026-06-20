import type { z } from 'zod';

import type { upsertAcademySchema } from './upsertAcademy.validation';

export type UpsertAcademyInput = z.infer<typeof upsertAcademySchema>;
