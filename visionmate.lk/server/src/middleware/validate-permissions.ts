import {NextFunction, Request, Response} from "express";
import {ApplicationError} from "../utils/application-error";
import { Permission, Role } from "../enums/auth";
import { IUser } from "../models/User.model";
// import User = Express.User;

export function verifyPermission(...permissions: Permission[]) {
    return function (req: Request, res: Response, next: NextFunction) {
        const user = req.user as IUser;
        if (user) {
            const [success, message] = checkPermission(user, permissions);
            if (success) {
                next();
            } else {
                throw new ApplicationError(message);
            }
        }
    };
}

export function checkPermission(user: IUser, permissions: Permission[]): [boolean, string] {
    switch (user.role) {
        case Role.USER:
        case Role.ADMIN:
        case Role.PATIENT:
            return [false, "Patient don't have special privileges"];
        default:
            return [false, "Unknown user role"];
    }
    // return [false, "Unknown user role"];
}
