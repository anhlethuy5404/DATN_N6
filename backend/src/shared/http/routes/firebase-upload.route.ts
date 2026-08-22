import { Router, type RequestHandler } from 'express';
import { FirebaseUploadController } from '../controller/firebase-upload.controller.js';
import { FirebaseStorageService } from '../../infrastructure/external/firebase/storage.service.js';
import {
  cccdUpload,
  disputeEvidencesUpload,
  billUpload,
  chatUpload,
  reportUpload,
} from '../middleware/firebase-upload.middleware.js';
import { type StorageFolder } from '../../infrastructure/external/firebase/storage.service.js';

const router = Router();
const controller = new FirebaseUploadController(new FirebaseStorageService());

// ─── Middleware: inject folder name into request ──────────────────────────────

function setFolder(folder: StorageFolder): RequestHandler {
  return (req, _res, next) => {
    (req as any).storageFolder = folder;
    next();
  };
}

// ─── Routes ───────────────────────────────────────────────────────────────────

/**
 * @swagger
 * tags:
 *   name: Firebase Upload
 *   description: Upload/xoá file trên Firebase Storage
 */

// ── CCCD ──────────────────────────────────────────────────────────────────────

/**
 * @swagger
 * /firebase-upload/cccd:
 *   post:
 *     summary: Upload 1 ảnh CCCD (mặt trước, mặt sau hoặc ảnh chân dung xác minh)
 *     tags: [Firebase Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [file]
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Ảnh CCCD (JPEG, PNG, WEBP) — tối đa 10 MB
 *     responses:
 *       200:
 *         description: Upload thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UploadSingleResponse'
 *       400:
 *         description: Không có file hoặc sai loại file
 */
router.post(
  '/cccd',
  setFolder('cccd'),
  cccdUpload.single('file'),
  controller.uploadSingleFile,
);

/**
 * @swagger
 * /firebase-upload/cccd/multiple:
 *   post:
 *     summary: Upload nhiều ảnh CCCD cùng lúc (tối đa 3 ảnh)
 *     tags: [Firebase Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [files]
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Tối đa 3 ảnh (JPEG, PNG, WEBP), mỗi ảnh tối đa 10 MB
 *     responses:
 *       200:
 *         description: Upload thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UploadMultipleResponse'
 */
router.post(
  '/cccd/multiple',
  setFolder('cccd'),
  cccdUpload.array('files', 3),
  controller.uploadMultipleFiles,
);

// ── Dispute Evidences ─────────────────────────────────────────────────────────

/**
 * @swagger
 * /firebase-upload/dispute-evidences:
 *   post:
 *     summary: Upload 1 file bằng chứng khiếu nại (video khui hàng, video lỗi, tài liệu)
 *     tags: [Firebase Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [file]
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: |
 *                   Ảnh (JPEG/PNG/WEBP), Video (MP4/MOV/AVI),
 *                   Tài liệu (PDF/DOCX/XLSX) — tối đa 100 MB
 *     responses:
 *       200:
 *         description: Upload thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UploadSingleResponse'
 */
router.post(
  '/dispute-evidences',
  setFolder('dispute-evidences'),
  disputeEvidencesUpload.single('file'),
  controller.uploadSingleFile,
);

/**
 * @swagger
 * /firebase-upload/dispute-evidences/multiple:
 *   post:
 *     summary: Upload nhiều file bằng chứng khiếu nại (tối đa 10 file)
 *     tags: [Firebase Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [files]
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Tối đa 10 file, mỗi file tối đa 100 MB
 *     responses:
 *       200:
 *         description: Upload thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UploadMultipleResponse'
 */
router.post(
  '/dispute-evidences/multiple',
  setFolder('dispute-evidences'),
  disputeEvidencesUpload.array('files', 10),
  controller.uploadMultipleFiles,
);

// ── Bill ──────────────────────────────────────────────────────────────────────

/**
 * @swagger
 * /firebase-upload/bill:
 *   post:
 *     summary: Upload 1 file hóa đơn / biên lai / chứng từ (PDF)
 *     tags: [Firebase Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [file]
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: File PDF — tối đa 20 MB
 *     responses:
 *       200:
 *         description: Upload thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UploadSingleResponse'
 */
router.post(
  '/bill',
  setFolder('bill'),
  billUpload.single('file'),
  controller.uploadSingleFile,
);

/**
 * @swagger
 * /firebase-upload/bill/multiple:
 *   post:
 *     summary: Upload nhiều file hóa đơn (tối đa 5 file)
 *     tags: [Firebase Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [files]
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Tối đa 5 file PDF, mỗi file tối đa 20 MB
 *     responses:
 *       200:
 *         description: Upload thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UploadMultipleResponse'
 */
router.post(
  '/bill/multiple',
  setFolder('bill'),
  billUpload.array('files', 5),
  controller.uploadMultipleFiles,
);

// ── Chat ──────────────────────────────────────────────────────────────────────

/**
 * @swagger
 * /firebase-upload/chat:
 *   post:
 *     summary: Upload 1 file đính kèm trong chat (tài liệu, hợp đồng, file nén)
 *     tags: [Firebase Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [file]
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: |
 *                   Ảnh, Video, PDF, Word, Excel, ZIP/RAR — tối đa 50 MB
 *     responses:
 *       200:
 *         description: Upload thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UploadSingleResponse'
 */
router.post(
  '/chat',
  setFolder('chat'),
  chatUpload.single('file'),
  controller.uploadSingleFile,
);

/**
 * @swagger
 * /firebase-upload/chat/multiple:
 *   post:
 *     summary: Upload nhiều file đính kèm chat (tối đa 10 file)
 *     tags: [Firebase Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [files]
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Tối đa 10 file, mỗi file tối đa 50 MB
 *     responses:
 *       200:
 *         description: Upload thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UploadMultipleResponse'
 */
router.post(
  '/chat/multiple',
  setFolder('chat'),
  chatUpload.array('files', 10),
  controller.uploadMultipleFiles,
);

// ── Report ────────────────────────────────────────────────────────────────────

/**
 * @swagger
 * /firebase-upload/report:
 *   post:
 *     summary: Upload 1 file báo cáo doanh thu / sản lượng (PDF hoặc Excel)
 *     tags: [Firebase Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [file]
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: File PDF hoặc Excel (.xlsx) — tối đa 20 MB
 *     responses:
 *       200:
 *         description: Upload thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UploadSingleResponse'
 */
router.post(
  '/report',
  setFolder('report'),
  reportUpload.single('file'),
  controller.uploadSingleFile,
);

/**
 * @swagger
 * /firebase-upload/report/multiple:
 *   post:
 *     summary: Upload nhiều file báo cáo (tối đa 5 file)
 *     tags: [Firebase Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [files]
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Tối đa 5 file (PDF/XLSX), mỗi file tối đa 20 MB
 *     responses:
 *       200:
 *         description: Upload thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UploadMultipleResponse'
 */
router.post(
  '/report/multiple',
  setFolder('report'),
  reportUpload.array('files', 5),
  controller.uploadMultipleFiles,
);

// ── Delete ────────────────────────────────────────────────────────────────────

/**
 * @swagger
 * /firebase-upload/file:
 *   delete:
 *     summary: Xoá 1 file khỏi Firebase Storage
 *     tags: [Firebase Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Truyền một trong hai trường
 *             properties:
 *               filePath:
 *                 type: string
 *                 description: Đường dẫn tương đối trong bucket
 *                 example: "cccd/uuid-front.jpg"
 *               fileUrl:
 *                 type: string
 *                 description: URL đầy đủ trả về từ API upload
 *                 example: "https://storage.googleapis.com/bucket/cccd/uuid-front.jpg"
 *     responses:
 *       200:
 *         description: Xoá thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Xoá file thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     filePath:
 *                       type: string
 *                       example: cccd/uuid-front.jpg
 *       400:
 *         description: Thiếu filePath hoặc fileUrl
 *       404:
 *         description: File không tồn tại
 */
router.delete('/file', controller.deleteFile);

/**
 * @swagger
 * /firebase-upload/files:
 *   delete:
 *     summary: Xoá nhiều file khỏi Firebase Storage
 *     tags: [Firebase Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Truyền một trong hai trường
 *             properties:
 *               filePaths:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Mảng đường dẫn tương đối trong bucket
 *                 example: ["cccd/uuid-a.jpg", "bill/uuid-b.pdf"]
 *               fileUrls:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Mảng URL đầy đủ trả về từ API upload
 *     responses:
 *       200:
 *         description: Kết quả xoá (kể cả khi một số file bị lỗi)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     deleted:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: Các file đã xoá thành công
 *                     failed:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           filePath:
 *                             type: string
 *                           reason:
 *                             type: string
 *                       description: Các file xoá thất bại kèm lý do
 *       400:
 *         description: Thiếu filePaths hoặc fileUrls
 */
router.delete('/files', controller.deleteMultipleFiles);

// ─── Swagger component schemas ─────────────────────────────────────────────────

/**
 * @swagger
 * components:
 *   schemas:
 *     UploadedFile:
 *       type: object
 *       properties:
 *         url:
 *           type: string
 *           description: URL công khai để truy cập file
 *           example: "https://storage.googleapis.com/bucket/cccd/uuid-front.jpg"
 *         filePath:
 *           type: string
 *           description: Đường dẫn tương đối trong bucket (dùng để xoá)
 *           example: "cccd/uuid-front.jpg"
 *         fileName:
 *           type: string
 *           example: "uuid-front.jpg"
 *         originalName:
 *           type: string
 *           example: "front.jpg"
 *         size:
 *           type: number
 *           description: Kích thước file tính bằng bytes
 *           example: 204800
 *         mimeType:
 *           type: string
 *           example: "image/jpeg"
 *     UploadSingleResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Upload file thành công"
 *         data:
 *           $ref: '#/components/schemas/UploadedFile'
 *     UploadMultipleResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Upload thành công 2 file"
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/UploadedFile'
 */

export default router;
