import express, { type Express, type Request, type Response, type NextFunction } from 'express';
import { createRequire } from 'module';
import { prisma } from './shared/infrastructure/database/config.js';
import { swaggerSpec } from './shared/http/swagger/swagger.config.js';
import cloudinaryUploadRouter from './shared/http/routes/cloudinary-upload.route.js';
import firebaseUploadRouter from './shared/http/routes/firebase-upload.route.js';

// CJS interop: swagger-ui-express không có ESM exports
const require = createRequire(import.meta.url);
const swaggerUi = require('swagger-ui-express') as {
  serve: express.RequestHandler[];
  setup: (
    spec: unknown,
    options?: {
      swaggerOptions?: Record<string, unknown>;
    },
  ) => express.RequestHandler;
};

const PORT = Number(process.env.PORT) || 3000;
const app: Express = express();

// Body parsers 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
      tryItOutEnabled: true,
    },
  }),
);

// Endpoint trả raw JSON spec (dùng để import vào Postman)
app.get('/api-docs.json', (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// API Routes 
app.use('/upload', cloudinaryUploadRouter);
app.use('/firebase-upload', firebaseUploadRouter);

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Error]', err.stack ?? err.message);

  // Multer errors (wrong file type / file too large)
  if (err.message.startsWith('Loại file không hợp lệ') || err.message.includes('File too large')) {
    res.status(400).json({ success: false, message: err.message });
    return;
  }

  res.status(500).json({ success: false, message: 'Lỗi server nội bộ' });
});

// DB connection
void prisma;

// Start server 
app.listen(PORT, () => {
  console.log(`Server       → http://localhost:${PORT}`);
  console.log(`Swagger UI   → http://localhost:${PORT}/api-docs`);
  console.log(`Swagger JSON → http://localhost:${PORT}/api-docs.json`);
});