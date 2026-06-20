import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

import { env } from 'config/env';

const isEmulator = Boolean(env.FIRESTORE_EMULATOR_HOST);

const getOrCreateApp = () => {
  if (getApps().length) return getApp();

  const base = { projectId: env.FIREBASE_PROJECT_ID, storageBucket: env.FIREBASE_STORAGE_BUCKET };

  if (isEmulator) return initializeApp(base); // 에뮬레이터: 자격증명 불필요

  return initializeApp({ ...base, credential: cert(JSON.parse(env.FIREBASE_SERVICE_ACCOUNT_JSON)) });
};

const app = getOrCreateApp();

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
