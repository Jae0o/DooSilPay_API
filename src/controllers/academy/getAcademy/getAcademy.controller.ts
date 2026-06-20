import type { RequestHandler } from 'express';

import { AcademyService } from 'services';

export const getAcademy: RequestHandler = async (req, res) => {
  const data = await AcademyService.getAcademy(req.auth!.uid);

  res.json({ ok: true, data });
};
