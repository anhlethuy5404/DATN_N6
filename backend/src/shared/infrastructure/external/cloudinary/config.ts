import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import { requireEnv } from '../../../utils/env.js';

dotenv.config();

const cloudName = requireEnv('CLOUDINARY_CLOUD_NAME');
const apiKey = requireEnv('CLOUDINARY_API_KEY');
const apiSecret = requireEnv('CLOUDINARY_API_SECRET');

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

export {cloudinary};