import { db } from 'config/firebase';

// Firestore `_meta/health` 문서의 status 값을 읽는다.
// 읽기 round-trip이 성공하면 백엔드 ↔ Firebase 연결이 확인된 것.
// 시드돼 있으면 "Firebase Connected", 문서가 없으면 null.
export const pingHealth = async (): Promise<string | null> => {
  const snap = await db.collection('_meta').doc('health').get();
  return snap.exists ? ((snap.data()?.status as string) ?? null) : null;
};
