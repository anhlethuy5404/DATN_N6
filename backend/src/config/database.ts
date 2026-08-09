import dotenv from 'dotenv';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../../generated/prisma/client.js';

dotenv.config();

const host = process.env.DATABASE_HOST;
const user = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;
const database = process.env.DATABASE_NAME;
const port = Number(process.env.DATABASE_PORT);

if (!host || !user || !password || !database || Number.isNaN(port)) {
  throw new Error('Missing required database connection values in environment variables');
}

const adapter = new PrismaMariaDb({
  host,
  port,
  user,
  password,
  database,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionLimit: 5,
  connectTimeout: 10000,
});

export const prisma = new PrismaClient({ adapter });
