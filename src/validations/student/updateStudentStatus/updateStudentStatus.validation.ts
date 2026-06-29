import { z } from 'zod';

// ST-5 활성/비활성 토글 (PATCH /:id/status)
export const updateStudentStatusSchema = z.object({
  status: z.enum(['active', 'inactive']),
});
