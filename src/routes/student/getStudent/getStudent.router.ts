import { Router } from 'express';

import { StudentController } from 'controllers';
import { requireAuth } from 'middlewares';

export const getStudentRouter = Router();

getStudentRouter.get('/:studentId', requireAuth, StudentController.getStudent);
