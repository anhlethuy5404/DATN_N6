import { type Request, type Response, type NextFunction } from "express";
import { CloudinaryService } from "../service/cloudinary.service.js";
import { sendSuccess, sendError } from "../utils/response.js";

export class UploadController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  /**
   * Upload single image
   * POST /upload/image
   */
  uploadImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        return sendError(res, 400, "No file uploaded");
      }

      const folder = (req.body.folder as string) || "products";

      const result = await this.cloudinaryService.uploadImage(
        req.file.path,
        folder,
      );

      sendSuccess(res, result, "Image uploaded successfully");
    } catch (error) {
      next(error);
    }
  };

  /**
   * Upload multiple images
   * POST /upload/images
   */
  uploadMultipleImages = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        return sendError(res, 400, "No files uploaded");
      }

      const folder = (req.body.folder as string) || "products";
      const filePaths = req.files.map((file) => file.path);

      const results = await this.cloudinaryService.uploadMultipleImages(
        filePaths,
        folder,
      );

      sendSuccess(res, results, "Images uploaded successfully");
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete image
   * DELETE /upload/image/:publicId
   */
  deleteImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { publicId } = req.query;

      if (!publicId || typeof publicId !== "string") {
        return sendError(res, 400, "Public ID is required");
      }

      await this.cloudinaryService.deleteImage(publicId);

      sendSuccess(res, null, "Image deleted successfully");
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete multiple images
   * DELETE /upload/images
   */
  deleteMultipleImages = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { publicIds } = req.body;

      if (!Array.isArray(publicIds) || publicIds.length === 0) {
        return sendError(res, 400, "At least one public ID is required");
      }

      await this.cloudinaryService.deleteMultipleImages(publicIds);

      sendSuccess(res, null, "Images deleted successfully");
    } catch (error) {
      next(error);
    }
  };
}