import type { RequestHandler } from 'express';

import { StudentService } from 'services';

export const patchStudentStatus: RequestHandler<{ studentId: string }> = async (req, res) => {
  const data = await StudentService.setStudentStatus(req.auth!.uid, req.params.studentId, req.body.status);

  res.json({ ok: true, data });
};
