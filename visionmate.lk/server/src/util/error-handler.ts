import {isHttpError} from "http-errors";
import {Request, Response, NextFunction} from 'express';

export const jsonErrorHandler = (error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message: errorMessage,
    });
}