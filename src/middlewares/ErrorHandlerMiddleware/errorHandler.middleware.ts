import type { ErrorRequestHandler } from 'express';

import { AppError } from 'constants/AppError';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof AppError) {
    res.status(err.status).json({ ok: false, error: { code: err.code, message: err.message } });
    return;
  }

  console.error(err);
  res.status(500).json({ ok: false, error: { code: 'INTERNAL', message: '서버 오류가 발생했습니다.' } });
};
