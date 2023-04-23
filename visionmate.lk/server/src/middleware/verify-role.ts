import {NextFunction, Request, Response} from "express";
import {ApplicationError} from "../utils/application-error";
import { Role } from "../enums/auth";
import { IUser } from "../models/User.model";

export function verifyRole(roles: Role[]) {
    return function (req: Request, res: Response, next: NextFunction) {
        const user = req.user as IUser;
        if (user && user.role && roles.includes(<Role>user.role)) {
            next();
        } else {
            throw new ApplicationError("Permission denied.");
        }
    };
}
