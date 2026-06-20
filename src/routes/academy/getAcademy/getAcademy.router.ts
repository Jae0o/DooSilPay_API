import { Router } from 'express';

import { AcademyController } from 'controllers';
import { requireAuth } from 'middlewares';

export const getAcademyRouter = Router();

getAcademyRouter.get('/', requireAuth, AcademyController.getAcademy);
