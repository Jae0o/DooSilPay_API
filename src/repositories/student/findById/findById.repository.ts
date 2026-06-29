import type { Student } from 'interfaces';

import { studentsCol } from '../studentCollection';

export const findById = async (uid: string, id: string): Promise<Student | null> => {
  const snap = await studentsCol(uid).doc(id).get();
  const data = snap.exists ? (snap.data() as Student) : null;

  return data && data.deletedAt === null ? data : null; // 소프트삭제 건은 없는 것으로
};
