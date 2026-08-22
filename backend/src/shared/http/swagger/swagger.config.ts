import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const swaggerJSDoc = require('swagger-jsdoc') as (options: Record<string, unknown>) => unknown;

type Options = {
  definition: Record<string, unknown>;
  apis: string[];
};

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description:
        'API documentation bao gồm các API upload file lên ' +
        'Firebase Storage, quản lý người dùng, sản phẩm, đơn hàng và khiếu nại.',
      contact: {
        name: 'Trade and auction platform for second-hand goods',
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT ?? 3000}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Nhập JWT token (không cần prefix "Bearer")',
        },
      },
    },
    security: [{ bearerAuth: [] }],
    tags: [
      {
        name: 'Firebase Upload',
        description:
          'Upload và xoá file trên Firebase Storage — CCCD, Bằng chứng khiếu nại, Hóa đơn, Chat, Báo cáo',
      },
      {
        name: 'Upload',
        description: 'Upload và xoá ảnh sản phẩm lên Cloudinary',
      },
    ],
  },
  // Quét JSDoc comments từ tất cả route files
  apis: [
    './src/shared/http/routes/*.ts',
    './src/shared/http/routes/*.js',
    './src/modules/**/presentation/routes/*.ts',
    './src/modules/**/presentation/routes/*.js',
  ],
};

export const swaggerSpec = swaggerJSDoc(options);
