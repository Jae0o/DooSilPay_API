import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import type { Auth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

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

let authClient: Auth | undefined;

// `firebase-admin/auth`는 jose(ESM 전용)를 끌어와 Vercel CJS 번들에서 정적 require 시
// ERR_REQUIRE_ESM 으로 죽는다. 동적 import()는 번들에 그대로 남아 ESM을 안전하게 로드하므로
// auth 는 지연 생성한다.
export const getAuthClient = async (): Promise<Auth> => {
  if (!authClient) {
    const { getAuth } = await import('firebase-admin/auth');
    authClient = getAuth(app);
  }
  return authClient;
};
