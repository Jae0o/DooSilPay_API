import { build } from 'esbuild';
import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs';

// Vercel 배포 전용 번들. @vercel/node는 tsconfig baseUrl(베어 임포트)을 런타임에 해석하지 못하므로,
// src/app.ts를 의존성 그래프째 단일 파일(api/_bundle.mjs)로 묶어 베어 임포트를 전부 인라인한다.
// node_modules(express·firebase-admin·zod)는 external로 두어 런타임에 node_modules에서 로드한다.
// 출력은 ESM(.mjs): 런타임이 import 기반이라 ESM 전용 패키지(jose 등)도 정상 로드된다.
await build({
  entryPoints: ['src/app.ts'],
  bundle: true,
  platform: 'node',
  target: 'node20',
  format: 'esm',
  outfile: 'api/_bundle.mjs',
  external: ['express', 'zod', 'firebase-admin', 'firebase-admin/*'],
});

// Other 프리셋의 정적 출력 디렉터리. Vercel은 '비어 있으면' 거부하므로 placeholder 1개를 둔다.
// index.html이 아니므로 '/'는 정적 서빙되지 않고 rewrites로 /api 함수가 처리한다.
mkdirSync('public', { recursive: true });
writeFileSync('public/keep.txt', 'DooPay backend API — see /api/health\n');

// 파비콘(추적되는 assets/에서 복사). public 은 gitignore라 빌드마다 재생성되므로 여기서 채운다.
// 정적 파일은 rewrites(/(.*) → /api)보다 먼저 매칭되어 /favicon.ico 로 그대로 서빙된다.
copyFileSync('assets/favicon.ico', 'public/favicon.ico');
copyFileSync('assets/favicon.svg', 'public/favicon.svg');
