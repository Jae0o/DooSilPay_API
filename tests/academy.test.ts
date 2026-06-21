import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';

import app from '../src/app';

// repositories 배럴을 mock → firebase init 없이 라우터 배선·인증 가드만 검증.
vi.mock('repositories', () => ({
  HealthRepository: { pingHealth: vi.fn() },
  AcademyRepository: { getByOwner: vi.fn() },
}));

describe('GET /api/academy', () => {
  it('토큰 없음 → 401 UNAUTHENTICATED', async () => {
    const res = await request(app).get('/api/academy');

    expect(res.status).toBe(401);
    expect(res.body).toEqual({ ok: false, error: { code: 'UNAUTHENTICATED', message: '로그인이 필요합니다.' } });
  });
});

describe('PUT /api/academy', () => {
  it('토큰 없음 → 401 UNAUTHENTICATED', async () => {
    const res = await request(app).put('/api/academy').send({ name: 'A', ownerName: 'B' });

    expect(res.status).toBe(401);
    expect(res.body).toEqual({ ok: false, error: { code: 'UNAUTHENTICATED', message: '로그인이 필요합니다.' } });
  });
});
