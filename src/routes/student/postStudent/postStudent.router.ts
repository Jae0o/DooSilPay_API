import { Router } from 'express';

import { StudentController } from 'controllers';
import { requireAuth, validate } from 'middlewares';
import { createStudentSchema } from 'validations';

export const postStudentRouter = Router();

postStudentRouter.post('/', requireAuth, validate(createStudentSchema), StudentController.postStudent);
