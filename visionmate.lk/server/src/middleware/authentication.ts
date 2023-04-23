import * as passport from 'passport';
import {NextFunction, Request, Response} from "express";
import {AppLogger} from "../utils/logging";

export class Authentication {
    public static verifyToken(req: Request, res: Response, next: NextFunction) {
        return passport.authenticate('jwt', {session: false}, (err: any, user: any, info: any) => {
            if (err || !user) {
                AppLogger.error(`Login Failed. reason: ${info}`);
                return (res as any).sendError(info);
            }
            req.user = user;
            req.body.user = user._id;
            return next();
        })(req, res, next);
    }
}
