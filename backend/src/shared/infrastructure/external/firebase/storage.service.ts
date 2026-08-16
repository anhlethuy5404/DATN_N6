import { firebaseStorage } from './config.js';
import { randomUUID } from 'crypto';

export class FirebaseStorageService {
  async uploadFile(fileBuffer: Buffer, originalName: string, folder = 'documents') {
    const bucket = firebaseStorage.bucket();
    const fileName = `${folder}/${randomUUID()}-${originalName}`;
    const file = bucket.file(fileName);

    await file.save(fileBuffer, {
      metadata: { contentType: 'application/pdf' },
    });

    await file.makePublic();

    return `https://storage.googleapis.com/${bucket.name}/${fileName}`;
  }

  async deleteFile(fileName: string) {
    await firebaseStorage.bucket().file(fileName).delete();
  }
}