import { type Request, type Response, type NextFunction } from 'express';
import {
  FirebaseStorageService,
  type StorageFolder,
  type FileToUpload,
} from '../../infrastructure/external/firebase/storage.service.js';
import { sendSuccess, sendError } from '../utils/response.js';

export class FirebaseUploadController {
  constructor(
    private readonly storageService: FirebaseStorageService,
  ) {}

  // ─── Upload single file ──────────────────────────────────────────────────────

  /**
   * Upload 1 file lên Firebase Storage.
   * Route gắn sẵn `folder` vào `req.storageFolder` qua middleware hoặc route wrapper.
   *
   * POST /firebase-upload/:folder
   * Body: multipart/form-data  — field name: "file"
   */
  uploadSingleFile = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.file) {
        return sendError(res, 400, 'Không có file được gửi lên');
      }

      const folder = (req as any).storageFolder as StorageFolder;

      const fileToUpload: FileToUpload = {
        buffer: req.file.buffer,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
      };

      const result = await this.storageService.uploadFile(fileToUpload, folder);

      return sendSuccess(res, result, 'Upload file thành công');
    } catch (error) {
      next(error);
    }
  };

  // ─── Upload multiple files ───────────────────────────────────────────────────

  /**
   * Upload nhiều file lên Firebase Storage cùng 1 folder.
   *
   * POST /firebase-upload/:folder/multiple
   * Body: multipart/form-data  — field name: "files" (array)
   */
  uploadMultipleFiles = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const files = req.files as Express.Multer.File[] | undefined;

      if (!files || files.length === 0) {
        return sendError(res, 400, 'Không có file nào được gửi lên');
      }

      const folder = (req as any).storageFolder as StorageFolder;

      const filesToUpload: FileToUpload[] = files.map((f) => ({
        buffer: f.buffer,
        originalName: f.originalname,
        mimeType: f.mimetype,
        size: f.size,
      }));

      const results = await this.storageService.uploadMultipleFiles(
        filesToUpload,
        folder,
      );

      return sendSuccess(
        res,
        results,
        `Upload thành công ${results.length} file`,
      );
    } catch (error) {
      next(error);
    }
  };

  // ─── Delete single file ──────────────────────────────────────────────────────

  /**
   * Xoá 1 file khỏi Firebase Storage.
   *
   * DELETE /firebase-upload/file
   * Body: { "filePath": "cccd/uuid-front.jpg" }
   *   hoặc truyền URL đầy đủ và service sẽ tự extract path.
   */
  deleteFile = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      let { filePath, fileUrl } = req.body as {
        filePath?: string;
        fileUrl?: string;
      };

      // Support passing the full public URL instead of the bucket-relative path
      if (!filePath && fileUrl) {
        filePath = this.storageService.extractFilePathFromUrl(fileUrl) ?? undefined;
      }

      if (!filePath) {
        return sendError(
          res,
          400,
          'Cần truyền `filePath` (đường dẫn trong bucket) hoặc `fileUrl` (URL đầy đủ)',
        );
      }

      await this.storageService.deleteFile(filePath);

      return sendSuccess(res, { filePath }, 'Xoá file thành công');
    } catch (error: any) {
      // File not found → 404
      if (error?.message?.includes('File not found')) {
        return sendError(res, 404, error.message);
      }
      next(error);
    }
  };

  // ─── Delete multiple files ───────────────────────────────────────────────────

  /**
   * Xoá nhiều file khỏi Firebase Storage.
   * Tiếp tục xoá các file còn lại kể cả khi một số file bị lỗi.
   *
   * DELETE /firebase-upload/files
   * Body: { "filePaths": ["cccd/uuid-a.jpg", "bill/uuid-b.pdf"] }
   *   hoặc { "fileUrls": ["https://storage.googleapis.com/..."] }
   */
  deleteMultipleFiles = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      let { filePaths, fileUrls } = req.body as {
        filePaths?: string[];
        fileUrls?: string[];
      };

      // Support full URLs
      if ((!filePaths || filePaths.length === 0) && fileUrls && fileUrls.length > 0) {
        filePaths = fileUrls
          .map((url) => this.storageService.extractFilePathFromUrl(url))
          .filter((p): p is string => p !== null);
      }

      if (!filePaths || filePaths.length === 0) {
        return sendError(
          res,
          400,
          'Cần truyền `filePaths` (mảng đường dẫn) hoặc `fileUrls` (mảng URL đầy đủ)',
        );
      }

      const result = await this.storageService.deleteMultipleFiles(filePaths);

      const hasFailures = result.failed.length > 0;
      const statusCode = hasFailures && result.deleted.length === 0 ? 400 : 200;

      return res.status(statusCode).json({
        success: !hasFailures,
        message: hasFailures
          ? `Xoá ${result.deleted.length}/${filePaths.length} file. Một số file bị lỗi.`
          : `Xoá thành công ${result.deleted.length} file`,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}
