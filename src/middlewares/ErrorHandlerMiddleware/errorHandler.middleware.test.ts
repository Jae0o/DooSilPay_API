import type { NextFunction, Request, Response } from 'express';
import { describe, expect, it, vi } from 'vitest';

import { AppError } from 'constants/AppError';

import { errorHandler } from './errorHandler.middleware';

// status().json() 체이닝을 흉내내는 mock res.
const mockRes = () => {
  const res = {} as Response;
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe('errorHandler', () => {
  it('AppError → 지정 상태코드 + { ok:false, error:{ code, message } }', () => {
    const res = mockRes();

    errorHandler(
      new AppError(404, 'ACADEMY_NOT_FOUND', '학원을 찾을 수 없습니다.'),
      {} as Request,
      res,
      vi.fn() as NextFunction,
    );

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      error: { code: 'ACADEMY_NOT_FOUND', message: '학원을 찾을 수 없습니다.' },
    });
  });

  it('예기치 못한 Error → 500 INTERNAL + console.error', () => {
    const res = mockRes();
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const err = new Error('boom');

    errorHandler(err, {} as Request, res, vi.fn() as NextFunction);

    expect(spy).toHaveBeenCalledWith(err);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      error: { code: 'INTERNAL', message: '서버 오류가 발생했습니다.' },
    });

    spy.mockRestore();
  });
});
