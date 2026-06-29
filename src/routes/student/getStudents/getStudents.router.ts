import { Router } from 'express';

import { StudentController } from 'controllers';
import { requireAuth } from 'middlewares';

export const getStudentsRouter = Router();

// 쿼리 검증은 컨트롤러에서 safeParse (Express 5 query getter 이슈, 02-03)
getStudentsRouter.get('/', requireAuth, StudentController.getStudents);
