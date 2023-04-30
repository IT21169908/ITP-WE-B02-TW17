import {NextFunction, Request, Response} from 'express';
import {ErrorLogger} from '../utils/logging';

export function ResponseHandler(req: Request, res: Response, next: NextFunction) {
    // TODO correct this is not good practice -> (res as any)
    res.sendSuccess = (data: any, message: string | null = null) => {
        res.send({success: true, data: data, message: message});
    };

    res.sendError = (error: any, errorCode = 500) => {
        if (typeof error === 'string') {
            res.status(errorCode).json({success: false, error: error, errorCode: errorCode});
        } else {
            if (!error) {
                error = {stack: null, message: "Unknown Error"};
            }
            ErrorLogger.error(error.stack);
            res.status(errorCode).json({success: false, error: error.message, errorData: error, errorCode: errorCode});
        }
    };
    next();
}

// export function ResponseHandler(req: Request, res: Response, next: NextFunction) {
//     res.sendSuccess = (data: any, message: string = null) => {
//         res.send({success: true, data: data, message: message});
//     };
//     res.sendError = (error: any, errorCode = 0) => {
//         if (typeof error === 'string') {
//             res.send({success: false, error: error, errorCode: errorCode});
//         } else {
//             if (!error) {
//                 error = {stack: null, message: "Unknown Error"};
//             }
//             ErrorLogger.error(error.stack);
//             res.send({success: false, error: error.message, errorData: error, errorCode: errorCode});
//         }
//     };
//     next();
// }
