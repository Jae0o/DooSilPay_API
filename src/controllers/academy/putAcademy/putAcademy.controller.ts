import type { RequestHandler } from 'express';

import { AcademyService } from 'services';

export const putAcademy: RequestHandler = async (req, res) => {
  const data = await AcademyService.saveAcademy(req.auth!.uid, req.body);

  res.json({ ok: true, data });
};
