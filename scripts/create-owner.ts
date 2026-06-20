import { getApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

import '../src/config/firebase'; // side-effect: env 검증 + admin app 초기화

// 개발자가 원장(서비스 사용자) 계정을 직접 발급하는 스크립트.
// 회원가입 엔드포인트가 없으므로(라우트맵 §6) "접근 권한 부여" = 여기서 Firebase Auth 유저를 만드는 것.
// 계정 = Firebase Auth(email/password/uid). 학원 정보는 로그인 후 온보딩에서 owners/{uid}로 입력.
//
// 사용:  pnpm create:owner <email> [password]
//   - password 생략 시 공용 임시비번 'doosilwelcome' 사용.
//   - 원장은 첫 로그인 시 온보딩(/onboarding/academy)에서 비밀번호를 재설정한다
//     (학원정보 없음 = 첫 진입 신호 → FE에서 updatePassword 후 학원정보 저장).
//   - 실 프로젝트에 만들려면 prod env로 실행:
//       tsx --env-file=.env.production scripts/create-owner.ts <email>
//
// (scripts/는 tsconfig include 밖이라 상대경로 임포트. 이 스크립트는 tsx/Node 로컬 실행 전용이라
//  firebase-admin/auth 정적 로드 가능 — Vercel CJS 번들 제약과 무관.)

const [email, passwordArg] = process.argv.slice(2);

if (!email) {
  console.error('사용법: pnpm create:owner <email> [password]');
  process.exit(1);
}

const password = passwordArg ?? 'doosilwelcome';

if (password.length < 6) {
  console.error('비밀번호는 6자 이상이어야 합니다.');
  process.exit(1);
}

const run = async () => {
  try {
    const user = await getAuth(getApp()).createUser({ email, password });
    console.log('✓ 원장 계정 생성 완료');
    console.log(`  uid:      ${user.uid}`);
    console.log(`  email:    ${email}`);
    console.log(`  password: ${password}`);
    console.log('첫 로그인 시 온보딩(/onboarding/academy)에서 비밀번호 재설정 + 학원정보 입력으로 유도됩니다.');
    process.exit(0);
  } catch (err: unknown) {
    if ((err as { code?: string }).code === 'auth/email-already-exists') {
      console.error(`이미 존재하는 이메일입니다: ${email}`);
    } else {
      console.error('계정 생성 실패:', err);
    }
    process.exit(1);
  }
};

void run();
