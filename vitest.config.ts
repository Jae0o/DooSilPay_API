import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()], // baseUrl 베어 임포트 해석
  test: {
    environment: 'node',

    include: ['tests/**/*.test.ts', 'src/**/*.test.ts'], // 콜로케이트 포함

    env: {
      NODE_ENV: 'test',
      FIREBASE_PROJECT_ID: 'doopay-dev',
      FIREBASE_SERVICE_ACCOUNT_JSON: '{}',
      FIREBASE_STORAGE_BUCKET: 'doopay-dev.appspot.com',
      ALLOWED_ORIGINS: 'http://localhost:3000',
      FIRESTORE_EMULATOR_HOST: 'localhost:8080',
      FIREBASE_AUTH_EMULATOR_HOST: 'localhost:9099',
      FIREBASE_STORAGE_EMULATOR_HOST: 'localhost:9199',
    },
  },
});
