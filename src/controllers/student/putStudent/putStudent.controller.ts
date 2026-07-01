import type { RequestHandler } from 'express';

import { StudentService } from 'services';

export const putStudent: RequestHandler<{ studentId: string }> = async (req, res) => {
  const data = await StudentService.updateStudent(req.auth!.uid, req.params.studentId, req.body);

  res.json({ ok: true, data });
};
