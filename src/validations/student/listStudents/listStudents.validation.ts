import { z } from 'zod';

// ST-2 목록 쿼리. page/limit은 문자열로 들어오므로 coerce.
export const listStudentsQuerySchema = z.object({
  q: z.string().trim().optional(),
  status: z.enum(['active', 'inactive', 'all']).default('active'),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sort: z.enum(['registrationNo', 'name']).default('registrationNo'),
  order: z.enum(['asc', 'desc']).default('asc'),
});
