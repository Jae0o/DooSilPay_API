import { describe, expect, it } from 'vitest';

import { createStudentSchema } from './createStudent.validation';

describe('createStudentSchema', () => {
  it('필수(name·monthlyFee) 누락 → 실패', () => {
    const result = createStudentSchema.safeParse({ subjectName: '피아노' });

    expect(result.success).toBe(false);
  });

  it('보호자명만 있고 연락처 없음 → 실패', () => {
    const result = createStudentSchema.safeParse({ name: '홍길동', monthlyFee: 100000, guardianName: '홍부모' });

    expect(result.success).toBe(false);
  });

  it('미래 생년월일 → 실패', () => {
    const result = createStudentSchema.safeParse({ name: '홍길동', monthlyFee: 100000, birthDate: '2999-01-01' });

    expect(result.success).toBe(false);
  });

  it('유효 입력 → 통과, name trim', () => {
    const result = createStudentSchema.safeParse({ name: '  홍길동  ', monthlyFee: 100000 });

    expect(result.success).toBe(true);
    expect(result.data?.name).toBe('홍길동');
  });
});
