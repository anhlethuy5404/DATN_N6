import { type Response } from "express";
import { type ApiResponse } from "../types/api.js";

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data?: T,
) => {
  const response: ApiResponse<T> = {
    success,
    message,
  };

  if (data !== undefined) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message: string = "Success",
) => {
  return sendResponse(res, 200, true, message, data);
};

export const sendCreated = <T>(
  res: Response,
  data: T,
  message: string = "Created successfully",
) => {
  return sendResponse(res, 201, true, message, data);
};

export const sendError = (
  res: Response,
  statusCode: number,
  message: string,
  error?: any,
) => {
  return sendResponse(res, statusCode, false, message, error);
};