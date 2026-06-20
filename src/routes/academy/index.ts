import { Router } from 'express';

import { getAcademyRouter } from './getAcademy';

export const academyRouter = Router();

academyRouter.use(getAcademyRouter);
