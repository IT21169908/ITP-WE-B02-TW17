import { NextFunction, Request, Response } from "express";
import * as UserDao from "../dao/User.dao";
import { Role } from "../enums/auth";
import { validationsChecker } from "../middleware/validations/validation-handler";
import { AppLogger } from "../utils/logging";
import { IUser } from "../models/User.model";
import { AuthValidations } from "../middleware/validations/auth-validations";
import { validationResult } from "express-validator";
import * as PatientEp from "./Patient.ep";

export function authenticateValidationRules() {
    return [
        AuthValidations.email(),
        AuthValidations.passwordLogin(),
    ];
}

export function registerValidationRules() {
    return [
        AuthValidations.role(Role.PATIENT),
        AuthValidations.email(),
        AuthValidations.name().optional({checkFalsy: true}),
        AuthValidations.password(),
        AuthValidations.confirmPassword(),
        AuthValidations.noPermissions(),
        AuthValidations.phone().if(AuthValidations.role(Role.PATIENT)).optional(),
    ];
}

export async function loginUser(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        UserDao.authenticateUser(req.body.email, req.body.password, req.body.signedUpAs, !!req.body.remember).then((token: string) => {
            res.cookie('token', token, {httpOnly: true, secure: false, maxAge: 3600000 * 24 * 30}); // TODO set same expiration set to jwt token
            res.sendSuccess(token);
        }).catch(next);
    }
}

export async function registerUser(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        const {role, email} = req.body;
        const user = await UserDao.getUserByEmail(email);
        if (user) {
            res.sendError('User Already Exits!', 403);
        } else {
            if (role === Role.PATIENT) {
                try {
                    await PatientEp.register(req, res, next);
                } catch (e) {
                    res.sendError(e);
                }
            }
                // else if (role === Role.ADMIN) {
                //     try {
                //         await AdminEp.register(req, res, next);
                //     } catch (e) {
                //         res.sendError(e);
                //     }
            // }
            else {
                res.sendError('Role Required!!');
            }
        }
    }
}

export function getSelf(req: Request, res: Response, next: NextFunction) {
    const user = req.user as IUser;
    AppLogger.info(`Get user for id ${user._id}`);
    UserDao.getUser(user._id).then((user: IUser) => {
        AppLogger.info(`Found user ${!!user}`);
        res.sendSuccess(user);
    }).catch(next);
}
