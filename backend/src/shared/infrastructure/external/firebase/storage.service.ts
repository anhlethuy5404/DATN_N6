import { firebaseStorage } from './config.js';
import { randomUUID } from 'crypto';
import path from 'path';

export interface UploadedFileResult {
  url: string;
  filePath: string;   
  fileName: string;   
  originalName: string;
  size: number;       
  mimeType: string;
}

export interface FileToUpload {
  buffer: Buffer;
  originalName: string;
  mimeType: string;
  size: number;
}

// Allowed folders

export type StorageFolder =
  | 'cccd'
  | 'dispute-evidences'
  | 'bill'
  | 'chat'
  | 'report';

// Service

export class FirebaseStorageService {
  private get bucket() {
    return firebaseStorage.bucket();
  }

  /**
   * Sanitise a filename so it is URL-safe (keep extension, replace spaces etc.)
   */
  private sanitizeName(name: string): string {
    const ext = path.extname(name);
    const base = path.basename(name, ext)
      .replace(/[^a-zA-Z0-9_\-]/g, '_')
      .slice(0, 80); 
    return `${base}${ext}`;
  }

  /**
   * Build the full public GCS URL from a bucket-relative filePath.
   */
  private buildPublicUrl(filePath: string): string {
    return `https://storage.googleapis.com/${this.bucket.name}/${filePath}`;
  }

  // Upload single file 

  /**
   * Upload one file buffer to Firebase Storage.
   *
   * @param file - Buffer + metadata
   * @param folder - One of the predefined StorageFolder values
   * @returns UploadedFileResult with public URL and metadata
   */
  async uploadFile(
    file: FileToUpload,
    folder: StorageFolder,
  ): Promise<UploadedFileResult> {
    const safeName = this.sanitizeName(file.originalName);
    const fileName = `${randomUUID()}-${safeName}`;
    const filePath = `${folder}/${fileName}`;

    const fileRef = this.bucket.file(filePath);

    await fileRef.save(file.buffer, {
      predefinedAcl: 'publicRead',
      metadata: {
        contentType: file.mimeType,
        metadata: {
          originalName: file.originalName,
        },
      },
    });

    return {
      url: this.buildPublicUrl(filePath),
      filePath,
      fileName,
      originalName: file.originalName,
      size: file.size,
      mimeType: file.mimeType,
    };
  }

  // Upload multiple files 

  /**
   * Upload multiple file buffers to Firebase Storage concurrently.
   *
   * @param files - Array of FileToUpload objects
   * @param folder - One of the predefined StorageFolder values
   * @returns Array of UploadedFileResult
   */
  async uploadMultipleFiles(
    files: FileToUpload[],
    folder: StorageFolder,
  ): Promise<UploadedFileResult[]> {
    return Promise.all(files.map((file) => this.uploadFile(file, folder)));
  }

  // Delete single file 

  /**
   * Delete a single file from Firebase Storage.
   *
   * @param filePath - Bucket-relative path, e.g. "cccd/uuid-front.jpg"
   */
  async deleteFile(filePath: string): Promise<void> {
    const fileRef = this.bucket.file(filePath);

    const [exists] = await fileRef.exists();
    if (!exists) {
      throw new Error(`File not found in storage: ${filePath}`);
    }

    await fileRef.delete();
  }

  // Delete multiple files

  /**
   * Delete multiple files from Firebase Storage concurrently.
   * Continues deleting remaining files even if some fail; returns a summary.
   *
   * @param filePaths - Array of bucket-relative paths
   * @returns Object with deleted paths and any errors that occurred
   */
  async deleteMultipleFiles(filePaths: string[]): Promise<{
    deleted: string[];
    failed: { filePath: string; reason: string }[];
  }> {
    const results = await Promise.allSettled(
      filePaths.map((fp) => this.deleteFile(fp)),
    );

    const deleted: string[] = [];
    const failed: { filePath: string; reason: string }[] = [];

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        deleted.push(filePaths[index]!);
      } else {
        failed.push({
          filePath: filePaths[index]!,
          reason: result.reason instanceof Error
            ? result.reason.message
            : String(result.reason),
        });
      }
    });

    return { deleted, failed };
  }

  // Helpers 

  /**
   * Extract the bucket-relative filePath from a full public GCS URL.
   * Useful when you stored the URL in the database and need to delete.
   *
   * @param url - Full GCS public URL
   * @returns Bucket-relative path or null if not parseable
   */
  extractFilePathFromUrl(url: string): string | null {
    try {
      const bucketName = this.bucket.name;
      const prefix = `https://storage.googleapis.com/${bucketName}/`;
      if (url.startsWith(prefix)) {
        return decodeURIComponent(url.slice(prefix.length));
      }
      return null;
    } catch {
      return null;
    }
  }
}

// Singleton export for DI / direct import
export const firebaseStorageService = new FirebaseStorageService();