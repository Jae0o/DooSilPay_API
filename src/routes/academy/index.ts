import { Router } from 'express';

import { getAcademyRouter } from './getAcademy';
import { putAcademyRouter } from './putAcademy';

export const academyRouter = Router();

academyRouter.use(getAcademyRouter);
academyRouter.use(putAcademyRouter);
