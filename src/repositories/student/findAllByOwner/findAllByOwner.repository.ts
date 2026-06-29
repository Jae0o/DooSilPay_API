import type { Student } from 'interfaces';

import { studentsCol } from '../studentCollection';

// 메모리 필터 전략(ST-2): owner 전체를 읽어 서비스에서 필터/정렬/페이지. 소프트삭제 제외는 여기서.
export const findAllByOwner = async (uid: string): Promise<Student[]> => {
  const snap = await studentsCol(uid).where('deletedAt', '==', null).get();

  return snap.docs.map((d) => d.data() as Student);
};
