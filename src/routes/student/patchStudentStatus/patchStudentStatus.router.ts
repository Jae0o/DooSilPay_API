import { Router } from 'express';

import { StudentController } from 'controllers';
import { requireAuth, validate } from 'middlewares';
import { updateStudentStatusSchema } from 'validations';

export const patchStudentStatusRouter = Router();

patchStudentStatusRouter.patch(
  '/:studentId/status',
  requireAuth,
  validate(updateStudentStatusSchema),
  StudentController.patchStudentStatus,
);
