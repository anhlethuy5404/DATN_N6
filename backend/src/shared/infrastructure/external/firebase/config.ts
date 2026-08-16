import dotenv from 'dotenv';
import { initializeApp, cert, getApps, type App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { getMessaging } from 'firebase-admin/messaging';
import { requireEnv } from '../../../utils/env.js';

dotenv.config();

const existingApps = getApps();

const app: App =
  existingApps.length === 0
    ? initializeApp({
        credential: cert({
          projectId: requireEnv('FIREBASE_PROJECT_ID'),
          clientEmail: requireEnv('FIREBASE_CLIENT_EMAIL'),
          privateKey: requireEnv('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n'),
        }),
        storageBucket: requireEnv('FIREBASE_STORAGE_BUCKET'),
      })
    : existingApps[0]!;

export const firebaseAuth = getAuth(app);
export const firebaseDb = getFirestore(app);
export const firebaseStorage = getStorage(app);
export const firebaseMessaging = getMessaging(app);