import express from 'express';

import { HealthRepository } from 'repositories';

// import { routes } from 'routes';  // 도메인 단계에서 활성화

const app = express();
app.use(express.json({ limit: '1mb' }));

// Firestore에서 시드값을 읽어 백엔드 ↔ Firebase 연결을 검증한다.
app.get('/api/health', async (_req, res) => {
  try {
    const firebase = await HealthRepository.pingHealth();
    res.json({ ok: true, firebase });
  } catch {
    res.status(503).json({ ok: false, firebase: null });
  }
});

// routes.forEach(({ path, router }) => app.use(`/api${path}`, router));
export default app;
