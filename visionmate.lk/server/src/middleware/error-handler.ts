import {NextFunction, Request, Response} from 'express';
import {AppLogger, ErrorLogger} from '../utils/logging';
import {ApplicationError} from '../utils/application-error';
import * as mongoose from "mongoose";

export function handleError(error: Error, req: Request, res: Response, next: NextFunction) {
    AppLogger.error(error.message);
    if (error instanceof ApplicationError) {
        (res as any).sendError(error.message);
    } else if (error instanceof mongoose.Error) {
        ErrorLogger.error(error);
        (res as any).sendError(error.message, 1);
    } else {
        ErrorLogger.error(error);
        ErrorLogger.error(error!.stack);
        (res as any).sendError("An internal server error occurred", 1);
    }
}
