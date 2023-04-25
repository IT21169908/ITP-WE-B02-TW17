import { NextFunction, Request, Response } from "express";
import * as UserDao from "../dao/User.dao";
import { Role } from "../enums/auth";
import { AppLogger } from "../utils/logging";
import { IUser } from "../models/User.model";
import { Validations } from "../utils/validations";
import { validationResult } from "express-validator";
import * as PatientEp from "./Patient.ep";

export function authenticateValidationRules() {
    return [
        Validations.email(),
        Validations.passwordLogin(),
    ];
}

export function registerValidationRules() {
    return [
        Validations.role(Role.PATIENT),
        Validations.email(),
        Validations.name().optional({checkFalsy: true}),
        Validations.password(),
        Validations.confirmPassword(),
        Validations.noPermissions(),
        Validations.phone().if(Validations.role(Role.PATIENT)).optional(),
    ];
}

export async function loginUser(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.sendError(errors.array()[0]['msg'], 422);
    }

    UserDao.authenticateUser(req.body.email, req.body.password, req.body.signedUpAs, !!req.body.remember).then((token: string) => {
        res.cookie('token', token, {httpOnly: true, secure: false, maxAge: 3600000 * 24 * 30}); // TODO set same expiration set to jwt token
        res.sendSuccess(token);
    }).catch(next);
}

export async function registerUser(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.sendError(errors.array()[0]['msg'], 422);
    }

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

export function getSelf(req: Request, res: Response, next: NextFunction) {
    const user = req.user as IUser;
    AppLogger.info(`Get user for id ${user._id}`);
    UserDao.getUser(user._id).then((user: IUser) => {
        AppLogger.info(`Found user ${!!user}`);
        res.sendSuccess(user);
    }).catch(next);
}
