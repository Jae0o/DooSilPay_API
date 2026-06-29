import { db } from 'config/firebase';

import { counterRef } from '../studentCollection';

// 등록번호 채번: owner별 +1 (monotonic). create와 동일 트랜잭션에서 호출 (04-02).
export const nextRegistrationNo = async (uid: string): Promise<number> =>
  db.runTransaction(async (tx) => {
    const snap = await tx.get(counterRef(uid));
    const next = (snap.exists ? (snap.data()!.value as number) : 0) + 1;

    tx.set(counterRef(uid), { value: next }, { merge: true });

    return next;
  });
