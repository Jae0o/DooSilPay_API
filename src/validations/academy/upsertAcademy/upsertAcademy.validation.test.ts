import { describe, expect, it } from 'vitest';

import { upsertAcademySchema } from './upsertAcademy.validation';

describe('upsertAcademySchema', () => {
  it('필수(name·ownerName) 누락 → 실패', () => {
    const result = upsertAcademySchema.safeParse({ tel: '010-0000-0000' });

    expect(result.success).toBe(false);
  });

  it('유효 입력 → 통과, name·ownerName trim', () => {
    const result = upsertAcademySchema.safeParse({ name: '  두페이학원  ', ownerName: '  김원장  ' });

    expect(result.success).toBe(true);
    expect(result.data).toEqual({ name: '두페이학원', ownerName: '김원장' });
  });

  it('선택 필드(bizNo·tel·address) 생략 허용', () => {
    const result = upsertAcademySchema.safeParse({ name: '두페이학원', ownerName: '김원장' });

    expect(result.success).toBe(true);
  });
});
