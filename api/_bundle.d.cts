// api/_bundle.cjs(빌드 시 esbuild가 생성)의 타입 스텁.
// 번들 산출물은 gitignore되므로, tsc 타입체크가 깨지지 않도록 모듈 타입만 선언한다.
import type { Express } from 'express';

declare const app: Express;
export default app;
