import { Router } from 'express';

import { AcademyController } from 'controllers';
import { requireAuth, validate } from 'middlewares';
import { upsertAcademySchema } from 'validations';

export const putAcademyRouter = Router();

putAcademyRouter.put('/', requireAuth, validate(upsertAcademySchema), AcademyController.putAcademy);
