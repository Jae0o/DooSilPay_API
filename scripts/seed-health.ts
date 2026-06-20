import { db } from '../src/config/firebase';

// `_meta/health` 문서에 연결 검증용 값을 심는다.
// .env.development(에뮬레이터 호스트 포함)로 실행하면 에뮬레이터에, prod env로 실행하면 실 프로젝트에 시드된다.
// (scripts/는 tsconfig include 밖이라, 에디터 해석을 위해 베어 임포트 대신 상대경로 사용)
const seed = async () => {
  await db.collection('_meta').doc('health').set({ status: 'Firebase Connected' });
  console.log('✓ seeded _meta/health = "Firebase Connected"');
  process.exit(0);
};

void seed();
