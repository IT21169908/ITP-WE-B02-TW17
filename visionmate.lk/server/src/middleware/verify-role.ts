import {NextFunction, Request, Response} from "express";
import {Role} from "../enums/auth";
import createHttpError from "http-errors";
import {IUser} from "../models/User.model";

export function verifyRole(roles: Role[]) {
    return function (req: Request, res: Response, next: NextFunction) {
        const user = req.user as IUser;
        if (user && user.role && roles.includes(<Role>user.role)) {
            next();
        } else {
            //next();
            throw createHttpError(403, "Permission denied.");
        }
    };
}
