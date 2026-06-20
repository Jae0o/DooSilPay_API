import type { NextFunction, Request, Response } from 'express';
import { describe, expect, it, vi } from 'vitest';

import { notFound } from './notFound.middleware';

const mockRes = () => {
  const res = {} as Response;
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe('notFound', () => {
  it('404 + { ok:false, error:{ code:NOT_FOUND } }', () => {
    const res = mockRes();

    notFound({} as Request, res, vi.fn() as NextFunction);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      error: { code: 'NOT_FOUND', message: '경로를 찾을 수 없습니다.' },
    });
  });
});
