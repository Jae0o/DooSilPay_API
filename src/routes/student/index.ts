import { Router } from 'express';

import { deleteStudentRouter } from './deleteStudent';
import { getStudentRouter } from './getStudent';
import { getStudentsRouter } from './getStudents';
import { patchStudentStatusRouter } from './patchStudentStatus';
import { postStudentRouter } from './postStudent';
import { putStudentRouter } from './putStudent';

export const studentRouter = Router();

studentRouter.use(postStudentRouter);
studentRouter.use(getStudentsRouter);
studentRouter.use(putStudentRouter);
studentRouter.use(patchStudentStatusRouter);
studentRouter.use(deleteStudentRouter);
studentRouter.use(getStudentRouter); // 동적 ':studentId' GET 라우터는 맨 뒤
