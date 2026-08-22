import multer, { type FileFilterCallback } from 'multer';
import { type Request } from 'express';

// ─── MIME-type groups ─────────────────────────────────────────────────────────

const MIME = {
  image: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
  video: ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/mpeg', 'video/webm'],
  pdf:   ['application/pdf'],
  excel: [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ],
  word: [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  archive: ['application/zip', 'application/x-rar-compressed', 'application/x-zip-compressed'],
} as const;

// ─── Memory storage (file buffers uploaded directly to Firebase) ──────────────

const memoryStorage = multer.memoryStorage();

// ─── File filter factory ──────────────────────────────────────────────────────

function makeFileFilter(allowedMimes: string[]) {
  return (
    _req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          `Loại file không hợp lệ: ${file.mimetype}. Chỉ chấp nhận: ${allowedMimes.join(', ')}`,
        ),
      );
    }
  };
}

// ─── Per-folder multer instances ──────────────────────────────────────────────

/**
 * CCCD — Ảnh chụp CCCD 2 mặt + ảnh chụp người dùng xác minh.
 * Chỉ cho phép ảnh, tối đa 10 MB / file, tối đa 3 file.
 */
export const cccdUpload = multer({
  storage: memoryStorage,
  fileFilter: makeFileFilter([...MIME.image]),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

/**
 * Dispute Evidences — Video khui hàng, video lỗi sản phẩm, tài liệu đính kèm khiếu nại.
 * Cho phép ảnh, video, PDF, Word, Excel. Tối đa 100 MB / file.
 */
export const disputeEvidencesUpload = multer({
  storage: memoryStorage,
  fileFilter: makeFileFilter([
    ...MIME.image,
    ...MIME.video,
    ...MIME.pdf,
    ...MIME.word,
    ...MIME.excel,
  ]),
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB
});

/**
 * Bill — Hóa đơn đơn hàng, biên lai VNPAY, chứng từ rút tiền ví.
 * Chỉ cho phép PDF. Tối đa 20 MB / file.
 */
export const billUpload = multer({
  storage: memoryStorage,
  fileFilter: makeFileFilter([...MIME.pdf]),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
});

/**
 * Chat — Tệp đính kèm trong tin nhắn chat (tài liệu, hợp đồng, file nén).
 * Cho phép ảnh, video, PDF, Word, Excel, ZIP/RAR. Tối đa 50 MB / file.
 */
export const chatUpload = multer({
  storage: memoryStorage,
  fileFilter: makeFileFilter([
    ...MIME.image,
    ...MIME.video,
    ...MIME.pdf,
    ...MIME.word,
    ...MIME.excel,
    ...MIME.archive,
  ]),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
});

/**
 * Report — Báo cáo doanh thu, sản lượng giao dịch.
 * Chỉ cho phép PDF và Excel. Tối đa 20 MB / file.
 */
export const reportUpload = multer({
  storage: memoryStorage,
  fileFilter: makeFileFilter([...MIME.pdf, ...MIME.excel]),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
});
