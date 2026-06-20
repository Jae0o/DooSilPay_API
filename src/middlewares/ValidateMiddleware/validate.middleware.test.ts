import type { NextFunction, Request, Response } from 'express';
import { describe, expect, it, vi } from 'vitest';
import { z } from 'zod';

import { AppError } from 'constants/AppError';

import { validate } from './validate.middleware';

const schema = z.object({
  name: z.string().trim(),
  role: z.string().default('member'),
});

// validate 미들웨어를 만들어 직접 호출하고 (req, next) 를 돌려준다.
const run = async (data: unknown, source?: 'body' | 'params') => {
  const req = (source === 'params' ? { params: data } : { body: data }) as unknown as Request;
  const next = vi.fn() as unknown as NextFunction;
  await validate(schema, source)(req, {} as Response, next);
  return { req, next };
};

describe('validate', () => {
  it('형식 오류 → next(AppError 400 VALIDATION_ERROR), 필드 경로 포함, body 미교체', async () => {
    const body = { name: 123 };
    const { req, next } = await run(body);

    expect(req.body).toBe(body);
    const err = (next as ReturnType<typeof vi.fn>).mock.calls[0][0] as AppError;
    expect(err).toBeInstanceOf(AppError);
    expect(err.status).toBe(400);
    expect(err.code).toBe('VALIDATION_ERROR');
    expect(err.message).toContain('name');
  });

  it('통과 → body가 정제값(trim·default)으로 교체, next() 인자 없음', async () => {
    const { req, next } = await run({ name: '  doopay  ' });

    expect(req.body).toEqual({ name: 'doopay', role: 'member' });
    expect(next).toHaveBeenCalledWith();
  });

  it("source='params' → req.params를 검증·교체", async () => {
    const { req, next } = await run({ name: '  id-1  ' }, 'params');

    expect(req.params).toEqual({ name: 'id-1', role: 'member' });
    expect(next).toHaveBeenCalledWith();
  });
});
