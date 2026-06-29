import { Router } from 'express';

import { getStudentRouter } from './getStudent';
import { getStudentsRouter } from './getStudents';
import { postStudentRouter } from './postStudent';

export const studentRouter = Router();

studentRouter.use(postStudentRouter);
studentRouter.use(getStudentsRouter);
studentRouter.use(getStudentRouter); // 동적 ':studentId' 라우터는 맨 뒤
