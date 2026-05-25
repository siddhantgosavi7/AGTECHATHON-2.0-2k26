import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import path from 'node:path';
import { env } from './config/env.js';
import { errorHandler, notFound } from './middleware/error.js';
import apiRoutes from './routes/index.js';

const app = express();

app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/uploads', express.static(path.resolve('server/uploads')));

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'KrishiRakshak AI API', model: env.geminiModel });
});

app.use('/api', apiRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`KrishiRakshak AI API running on http://localhost:${env.port}`);
});
