import type { RequestHandler } from 'express';

import { AppError } from 'constants/AppError';
import { StudentService } from 'services';
import { listStudentsQuerySchema } from 'validations';

export const getStudents: RequestHandler = async (req, res) => {
  // ★ Express 5는 req.query가 getter라 validate 미들웨어의 재할당이 막힐 수 있어
  //   (02-03 메모) 쿼리는 컨트롤러에서 직접 파싱한다.
  const parsed = listStudentsQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    const detail = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(', ');
    throw new AppError(400, 'VALIDATION_ERROR', detail);
  }

  const data = await StudentService.listStudents(req.auth!.uid, parsed.data);

  res.json({ ok: true, data });
};
