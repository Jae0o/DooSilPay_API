import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
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

// auth / storage 는 도메인 단계에서 활성화한다.
// `firebase-admin/auth`는 jwks-rsa→jose(ESM 전용)를 끌어와 Vercel CJS 런타임에서
// ERR_REQUIRE_ESM 으로 죽으므로, 지금(Firestore만 필요한 단계)은 정적 로드하지 않는다.
// auth 도입 시 jose ESM 호환(pnpm overrides 등)을 함께 해결한다.
