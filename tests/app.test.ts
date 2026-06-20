import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';

import app from '../src/app';

// repositories 배럴을 mock → firebase init·실제 Firestore 연결 없이 배선만 검증.
vi.mock('repositories', () => ({ HealthRepository: { pingHealth: vi.fn() } }));

describe('app 미들웨어 배선', () => {
  it('허용 오리진 preflight → ACAO 헤더 반사', async () => {
    const res = await request(app)
      .options('/api/health')
      .set('Origin', 'http://localhost:3000')
      .set('Access-Control-Request-Method', 'GET');

    expect(res.headers['access-control-allow-origin']).toBe('http://localhost:3000');
  });

  it('비허용 오리진 → ACAO 헤더 없음(차단)', async () => {
    const res = await request(app).get('/api/health').set('Origin', 'http://evil.com');

    expect(res.headers['access-control-allow-origin']).toBeUndefined();
  });

  it('미정의 경로 → 404 NOT_FOUND (notFound 배선)', async () => {
    const res = await request(app).get('/api/nope');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ ok: false, error: { code: 'NOT_FOUND', message: '경로를 찾을 수 없습니다.' } });
  });
});
