import { Router } from 'express';

import { StudentController } from 'controllers';
import { requireAuth } from 'middlewares';

export const deleteStudentRouter = Router();

deleteStudentRouter.delete('/:studentId', requireAuth, StudentController.deleteStudent);
