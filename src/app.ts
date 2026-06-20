import express from 'express';

// import { routes } from 'routes';  // 도메인 단계에서 활성화

const app = express();
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => res.json({ ok: true }));

// routes.forEach(({ path, router }) => app.use(`/api${path}`, router));
export default app;
