import {NextFunction, Request, Response} from "express";
import { AnyObject } from "mongoose";
import {ApplicationError} from "../common/application-error";
import { Permission, Role } from "../enums/auth";
import User = Express.User;

export function verifyPermission(...permissions: Permission[]) {
    return function (req: Request, res: Response, next: NextFunction) {
        if (req.user) {
            const [success, message] = checkPermission(req.user, permissions);
            if (success) {
                next();
            } else {
                throw new ApplicationError(message);
            }
        }
    };
}

export function checkPermission(user: User|AnyObject, permissions: Permission[]): [boolean, string] {
    // TODO: check this role error
    // switch (user.role) {
    //     case Role.USER:
    //     case Role.ADMIN:
    //     case Role.PATIENT:
    //         return [false, "Patient don't have special privileges"];
    //     default:
    //         return [false, "Unknown user role"];
    // }
    return [false, "Unknown user role"];
}
