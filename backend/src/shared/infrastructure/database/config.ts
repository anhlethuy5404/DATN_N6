import dotenv from 'dotenv';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../../../../generated/prisma/client.js';
import { requireEnv } from '../../utils/env.js';

dotenv.config();

const host = requireEnv('DATABASE_HOST');
const user = requireEnv('DATABASE_USER');
const password = requireEnv('DATABASE_PASSWORD');
const database = requireEnv('DATABASE_NAME');
const port = Number(requireEnv('DATABASE_PORT'));

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
