import { Router } from "express";
import { UploadController } from "../controller/upload.controller.js";
import { CloudinaryService } from "../service/cloudinary.service.js";
import upload from "../middleware/upload.middleware.js";

const router = Router();
const uploadController = new UploadController(new CloudinaryService());

// All upload routes require authentication
// router.use(authMiddleware);

/**
 * @swagger
 * /upload/image:
 *   post:
 *     summary: Upload single image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file (JPEG, PNG, WEBP)
 *               folder:
 *                 type: string
 *                 description: Cloudinary folder name
 *                 default: products
 *     responses:
 *       200:
 *         description: Image uploaded successfully
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
 *                   example: Image uploaded successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                       example: https://res.cloudinary.com/xxx/image/upload/v123/products/image.jpg
 *                     publicId:
 *                       type: string
 *                       example: products/image_abc123
 *                     width:
 *                       type: number
 *                       example: 1200
 *                     height:
 *                       type: number
 *                       example: 800
 *                     format:
 *                       type: string
 *                       example: jpg
 *                     resourceType:
 *                       type: string
 *                       example: image
 *       400:
 *         description: No file uploaded or invalid file type
 *       401:
 *         description: Unauthorized
 */
router.post("/image", upload.single("image"), uploadController.uploadImage);

/**
 * @swagger
 * /upload/images:
 *   post:
 *     summary: Upload multiple images
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of image files (max 10)
 *               folder:
 *                 type: string
 *                 description: Cloudinary folder name
 *                 default: products
 *     responses:
 *       200:
 *         description: Images uploaded successfully
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
 *                   example: Images uploaded successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       url:
 *                         type: string
 *                       publicId:
 *                         type: string
 *                       width:
 *                         type: number
 *                       height:
 *                         type: number
 *                       format:
 *                         type: string
 *                       resourceType:
 *                         type: string
 *       400:
 *         description: No files uploaded
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/images",
  upload.array("images", 10),
  uploadController.uploadMultipleImages,
);

/**
 * @swagger
 * /upload/delete/image/{publicId}:
 *   delete:
 *     summary: Delete image by public ID
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: publicId
 *         required: true
 *         schema:
 *           type: string
 *         description: Cloudinary public ID (URL encoded, e.g., products%2Fimage_abc123)
 *         example: products%2Fimage_abc123
 *     responses:
 *       200:
 *         description: Image deleted successfully
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
 *                   example: Image deleted successfully
 *                 data:
 *                   type: null
 *       400:
 *         description: Public ID is required
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Image not found
 */
router.delete("/delete/image/", uploadController.deleteImage);

/**
 * @swagger
 * /upload/delete/images:
 *   delete:
 *     summary: Delete multiple images by public IDs
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               publicIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["products/img1", "products/img2"]
 *     responses:
 *       200:
 *         description: Images deleted successfully
 *       400:
 *         description: Public IDs array is required
 *       401:
 *         description: Unauthorized
 */
router.delete("/delete/images", uploadController.deleteMultipleImages);

export default router;