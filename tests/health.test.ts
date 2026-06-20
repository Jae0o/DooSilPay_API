import request from 'supertest';
import { describe, expect, it } from 'vitest';

import app from '../src/app';

describe('GET /api/health', () => {
  it('200 { ok: true }', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });
});
