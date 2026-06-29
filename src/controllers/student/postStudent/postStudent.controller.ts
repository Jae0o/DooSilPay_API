import type { RequestHandler } from 'express';

import { StudentService } from 'services';

export const postStudent: RequestHandler = async (req, res) => {
  const data = await StudentService.createStudent(req.auth!.uid, req.body);

  res.status(201).json({ ok: true, data });
};
