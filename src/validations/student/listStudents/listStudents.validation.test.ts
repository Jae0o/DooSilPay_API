import { describe, expect, it } from 'vitest';

import { listStudentsQuerySchema } from './listStudents.validation';

describe('listStudentsQuerySchema', () => {
  it('빈 쿼리 → 기본값 적용', () => {
    const result = listStudentsQuerySchema.safeParse({});

    expect(result.success).toBe(true);
    expect(result.data).toEqual({
      status: 'active',
      page: 1,
      limit: 20,
      sort: 'registrationNo',
      order: 'asc',
    });
  });

  it("page:'2' (문자열) → 2 (coerce)", () => {
    const result = listStudentsQuerySchema.safeParse({ page: '2' });

    expect(result.success).toBe(true);
    expect(result.data?.page).toBe(2);
  });
});
