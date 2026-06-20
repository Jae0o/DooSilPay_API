import type { RequestHandler } from 'express';

import { getAuthClient } from 'config/firebase';
import { AppError } from 'constants/AppError';

export const requireAuth: RequestHandler = async (req, _res, next) => {
  const header = req.headers.authorization ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    next(new AppError(401, 'UNAUTHENTICATED', '로그인이 필요합니다.'));
    return;
  }

  try {
    const auth = await getAuthClient();
    const decoded = await auth.verifyIdToken(token);
    req.auth = { uid: decoded.uid };

    next();
  } catch {
    next(new AppError(401, 'INVALID_TOKEN', '유효하지 않은 토큰입니다.'));
  }
};
