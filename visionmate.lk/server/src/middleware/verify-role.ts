import {NextFunction, Request, Response} from "express";
import {ApplicationError} from "../common/application-error";
import { Role } from "../enums/auth";

export function verifyRole(...roles: Role[]) {
    return function (req: Request, res: Response, next: NextFunction) {
        // TODO: check this role error
        // if (req.user && req.user.role) {
        //     if (roles.includes(<Role>req.user.role)) {
        //         next();
        //     } else {
        //         throw new ApplicationError("Permission denied.");
        //     }
        // }
        throw new ApplicationError("Permission denied.");
    };
}
