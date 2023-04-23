import {Request, Response} from 'express';
import {RequestLogger, UaLogger} from '../utils/logging';
import { IUser } from "../models/User.model";

export function RequestLoggerHandler(req: Request, res: Response, next: any) {
    if (req.method !== "OPTIONS") {
        const user = req.user as IUser;
        UaLogger.info(req.headers['user-agent'] + " :: " + req.url);
        res.on('finish', () => {
            const eUser = (user && user._id) ? 'U=' + user._id.toString() : "";
            const resOut = `${eUser.padEnd(6)} ${res.statusCode} ${req.method.padEnd(7)} ${req.url} ${res.statusMessage}`;
            RequestLogger.info(resOut);
        });
    }
    next();
}
