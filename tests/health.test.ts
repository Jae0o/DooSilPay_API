import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { HealthRepository } from 'repositories';

import app from '../src/app';

// repositories 배럴을 mock → firebase init·실제 Firestore 연결 없이 라우트만 검증.
vi.mock('repositories', () => ({ HealthRepository: { pingHealth: vi.fn() } }));

describe('GET /api/health', () => {
  beforeEach(() => vi.resetAllMocks());

  it('연결 OK → 200 { ok: true, firebase: 시드값 }', async () => {
    vi.mocked(HealthRepository.pingHealth).mockResolvedValue('Firebase Connected');

    const res = await request(app).get('/api/health');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true, firebase: 'Firebase Connected' });
  });

  it('읽기 실패 → 503 { ok: false, firebase: null }', async () => {
    vi.mocked(HealthRepository.pingHealth).mockRejectedValue(new Error('unreachable'));

    const res = await request(app).get('/api/health');

    expect(res.status).toBe(503);
    expect(res.body).toEqual({ ok: false, firebase: null });
  });
});
