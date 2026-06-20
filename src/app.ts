import cors from 'cors';
import express from 'express';

import { env } from 'config/env';
import { errorHandler, notFound } from 'middlewares';
import { HealthRepository } from 'repositories';
import { routes } from 'routes';

const app = express();

app.use(cors({ origin: env.ALLOWED_ORIGINS, credentials: false }));
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

routes.forEach(({ path, router }) => app.use(`/api${path}`, router));

app.use(notFound); // 라우터 뒤
app.use(errorHandler); // 가장 마지막
export default app;
