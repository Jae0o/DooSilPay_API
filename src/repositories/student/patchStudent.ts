import type { Student } from 'interfaces';

import { studentsCol } from './studentCollection';

// 존재 + 미삭제 확인 후 patch. 없으면 null 반환(service에서 404)
// barrel 미노출 — 도메인 내 repository에서 상대경로로만 사용.
export const patchStudent = async (uid: string, id: string, patch: Partial<Student>): Promise<Student | null> => {
  const ref = studentsCol(uid).doc(id);
  const snap = await ref.get();
  const cur = snap.exists ? (snap.data() as Student) : null;
  if (!cur || cur.deletedAt !== null) return null;

  const next = { ...patch, updatedAt: new Date().toISOString() };
  await ref.set(next, { merge: true });

  return { ...cur, ...next };
};
