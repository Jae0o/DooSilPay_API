import type { RequestHandler } from 'express';

import { StudentService } from 'services';

export const deleteStudent: RequestHandler<{ studentId: string }> = async (req, res) => {
  await StudentService.deleteStudent(req.auth!.uid, req.params.studentId);

  res.json({ ok: true, data: { id: req.params.studentId } });
};
