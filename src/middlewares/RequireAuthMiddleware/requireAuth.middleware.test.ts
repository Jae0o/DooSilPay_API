import type { NextFunction, Request, Response } from 'express';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AppError } from 'constants/AppError';

import { requireAuth } from './requireAuth.middleware';

const { verifyIdToken } = vi.hoisted(() => ({ verifyIdToken: vi.fn() }));

vi.mock('config/firebase', () => ({
  auth: { verifyIdToken },
}));

// requireAuth 를 직접 호출하고 (req, next) 를 돌려준다.
const run = async (authorization?: string) => {
  const req = { headers: authorization ? { authorization } : {} } as Request;
  const next = vi.fn() as unknown as NextFunction;
  await requireAuth(req, {} as Response, next);
  return { req, next };
};

describe('requireAuth', () => {
  beforeEach(() => {
    verifyIdToken.mockReset();
  });

  it('헤더 없음 → next(AppError 401 UNAUTHENTICATED), 토큰 검증 미호출', async () => {
    const { req, next } = await run();

    expect(verifyIdToken).not.toHaveBeenCalled();
    expect(req.auth).toBeUndefined();
    const err = (next as ReturnType<typeof vi.fn>).mock.calls[0][0] as AppError;
    expect(err).toBeInstanceOf(AppError);
    expect(err.status).toBe(401);
    expect(err.code).toBe('UNAUTHENTICATED');
  });

  it('정상 토큰 → req.auth.uid 주입, next() 인자 없음', async () => {
    verifyIdToken.mockResolvedValue({ uid: 'owner-123' });

    const { req, next } = await run('Bearer good-token');

    expect(verifyIdToken).toHaveBeenCalledWith('good-token');
    expect(req.auth).toEqual({ uid: 'owner-123' });
    expect(next).toHaveBeenCalledWith();
  });

  it('위조/만료 토큰 → next(AppError 401 INVALID_TOKEN)', async () => {
    verifyIdToken.mockRejectedValue(new Error('invalid'));

    const { req, next } = await run('Bearer bad-token');

    expect(req.auth).toBeUndefined();
    const err = (next as ReturnType<typeof vi.fn>).mock.calls[0][0] as AppError;
    expect(err).toBeInstanceOf(AppError);
    expect(err.status).toBe(401);
    expect(err.code).toBe('INVALID_TOKEN');
  });
});
