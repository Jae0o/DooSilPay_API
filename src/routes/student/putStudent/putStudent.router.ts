import { Router } from 'express';

import { StudentController } from 'controllers';
import { requireAuth, validate } from 'middlewares';
import { updateStudentSchema } from 'validations';

export const putStudentRouter = Router();

putStudentRouter.put('/:studentId', requireAuth, validate(updateStudentSchema), StudentController.putStudent);
