import { db } from 'config/firebase';
import type { Student } from 'interfaces';
import type { CreateStudentInput } from 'validations';

import { counterRef, studentsCol } from '../studentCollection';

// 채번 + 문서쓰기를 단일 트랜잭션으로 (registrationNo monotonic 보장)
export const create = async (uid: string, input: CreateStudentInput): Promise<Student> => {
  const docRef = studentsCol(uid).doc(); // Firestore 자동 ID
  const now = new Date().toISOString();

  return db.runTransaction(async (tx) => {
    const c = await tx.get(counterRef(uid));
    const registrationNo = (c.exists ? (c.data()!.value as number) : 0) + 1;
    const student: Student = {
      ...input,
      id: docRef.id,
      registrationNo,
      status: 'active',
      deletedAt: null,
      createdAt: now,
      updatedAt: now,
    };

    tx.set(counterRef(uid), { value: registrationNo }, { merge: true });
    tx.set(docRef, student);

    return student;
  });
};
