import { z } from 'zod';

export const upsertAcademySchema = z.object({
  name: z.string().trim().min(1, '학원명을 입력해 주세요.').max(50),
  ownerName: z.string().trim().min(1, '대표자명을 입력해 주세요.').max(30),
  bizNo: z.string().trim().optional(),
  tel: z.string().trim().optional(),
  address: z.string().trim().optional(),
});
