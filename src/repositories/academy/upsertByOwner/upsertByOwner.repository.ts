import { db } from 'config/firebase';
import type { AcademyProfile } from 'interfaces';
import type { UpsertAcademyInput } from 'validations';

export const upsertByOwner = async (uid: string, input: UpsertAcademyInput): Promise<AcademyProfile> => {
  const ref = db.collection('owners').doc(uid);
  const data = { ownerId: uid, ...input, updatedAt: new Date().toISOString() };

  await ref.set(data, { merge: true }); // 최초=생성, 이후=수정

  return (await ref.get()).data() as AcademyProfile;
};
