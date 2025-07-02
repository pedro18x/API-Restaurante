import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { ZodError } from "zod";

import { AppError } from "@/utils/AppError";

export function errorHandler(error: any, request: Request, response: Response, _: NextFunction): any {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({ message: error.message });
    }

    if (error instanceof ZodError) {
        return response
            .status(400)
            .json({ message: "validation error", issues: error.format() });
    }

    return response.status(500).json({ message: error.message });
}
