import type { RequestHandler } from 'express';

import { StudentService } from 'services';

export const getStudent: RequestHandler<{ studentId: string }> = async (req, res) => {
  const data = await StudentService.getStudent(req.auth!.uid, req.params.studentId);

  res.json({ ok: true, data });
};
