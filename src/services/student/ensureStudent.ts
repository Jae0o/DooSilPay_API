import { AppError } from 'constants/AppError';

// null → 404. barrel 미노출 — 도메인 내 service에서 상대경로로만 사용.
export const ensureStudent = async <T>(v: T | null): Promise<T> => {
  if (!v) throw new AppError(404, 'STUDENT_NOT_FOUND', '수강생을 찾을 수 없습니다.');

  return v;
};
