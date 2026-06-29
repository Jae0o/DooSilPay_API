import { AppError } from 'constants/AppError';
import { StudentRepository } from 'repositories';

export const getStudent = async (uid: string, id: string) => {
  const student = await StudentRepository.findById(uid, id);

  if (!student) throw new AppError(404, 'STUDENT_NOT_FOUND', '수강생을 찾을 수 없습니다.');

  return student;
};
