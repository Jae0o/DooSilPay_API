import { z } from 'zod';

// create/update 공용 base. barrel 미노출 — 단위 폴더에서 상대경로로만 사용.
// 보호자명↔연락처 동반, 미래 생년월일 차단 (상세-01 §2.1)
export const baseStudentSchema = z
  .object({
    name: z.string().trim().min(1, '성명을 입력해 주세요.').max(20),
    birthDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, '생년월일 형식(YYYY-MM-DD)이 아닙니다.')
      .refine((d) => new Date(d) <= new Date(), '생년월일은 미래일 수 없습니다.')
      .optional(),
    subjectName: z.string().trim().max(30).optional(),
    monthlyFee: z.number({ message: '교습비를 입력해 주세요.' }).int().min(0),
    paymentDay: z.number().int().min(1).max(31).optional(),
    guardianName: z.string().trim().max(20).optional(),
    guardianContact: z.string().trim().max(20).optional(),
    contact: z.string().trim().max(20).optional(),
    memo: z.string().trim().max(200).optional(),
  })
  .refine((v) => !v.guardianName || !!v.guardianContact, {
    path: ['guardianContact'],
    message: '보호자명이 있으면 보호자 연락처는 필수입니다.',
  });
