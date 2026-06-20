import type { RequestHandler } from 'express';

export const notFound: RequestHandler = (_req, res) => {
  res.status(404).json({ ok: false, error: { code: 'NOT_FOUND', message: '경로를 찾을 수 없습니다.' } });
};
