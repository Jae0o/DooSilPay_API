import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';

import { AppError } from 'constants/AppError';

type Source = 'body' | 'query' | 'params';

export const validate =
  (schema: ZodType, source: Source = 'body'): RequestHandler =>
  (req, _res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      const detail = result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(', ');
      next(new AppError(400, 'VALIDATION_ERROR', detail));

      return;
    }

    req[source] = result.data; // 정제값으로 교체(기본값·트림 반영)
    next();
  };
