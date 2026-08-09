import express, { type Express } from 'express';
import { prisma } from './config/database.js';
import uploadRouter from './routes/upload.route.js';

const PORT = Number(process.env.PORT) || 3000;
const app: Express = express();

app.use(express.json());
app.use('/upload', uploadRouter);

void prisma;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});