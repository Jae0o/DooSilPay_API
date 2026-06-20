import { db } from 'config/firebase';
import type { AcademyProfile } from 'interfaces';

export const getByOwner = async (uid: string): Promise<AcademyProfile | null> => {
  const snap = await db.collection('owners').doc(uid).get();

  return snap.exists ? (snap.data() as AcademyProfile) : null;
};
