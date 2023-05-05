import {NextFunction, Request, Response} from "express";
import * as UserDao from "../dao/User.dao";
import {Role} from "../enums/auth";
import {AuthValidations} from "../middleware/validations/auth-validations";
import {validationsChecker} from "../middleware/validations/validation-handler";
import {IUser} from "../models/User.model";
import {AppLogger} from "../utils/logging";
import * as PatientEp from "./Patient.ep";
import * as SurgeonEp from "./Surgeon.ep";
import * as DoctorEp from "./Doctor.ep";
import User from "../schemas/User.schema";

export function authenticateValidationRules() {
    return [
        AuthValidations.email(),
        AuthValidations.passwordLogin(),
    ];
}

export function registerValidationRules() {
    return [
        AuthValidations.role([Role.ADMIN, Role.PATIENT, Role.SURGEON, Role.DOCTOR]),
        AuthValidations.email(),
        AuthValidations.name().optional({checkFalsy: true}),
        AuthValidations.password(),
        AuthValidations.confirmPassword(),
        AuthValidations.noPermissions(),
        AuthValidations.phone(),
        // AuthValidations.phone().if(AuthValidations.role(Role.PATIENT)).optional(),
    ];
}

export async function loginUser(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        UserDao.authenticateUser(req.body.email, req.body.password, req.body.signedUpAs, !!req.body.remember)
            .then(async (data: AuthUserData) => {
                res.cookie('token', token, {httpOnly: true, secure: false, maxAge: 3600000 * 24 * 30}); // TODO set same expiration set to jwt token
                const user = await User.findOne({email: req.body.email}); // TODO: REFACTOR
                res.sendSuccess({token: data.token, user}, `User Logged as ${getRoleTitle(data.user.role)}!`);
            })
            .catch(next);
    }
}

export async function registerUser(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        const {role, email} = req.body;
        const user = await UserDao.getUserByEmail(email);
        if (user) {
            res.sendError('User Already Exits!', 409);
        } else {
            if (role === Role.PATIENT) {
                try {
                    await PatientEp.register(req, res, next);
                } catch (e) {
                    res.sendError(e);
                }
            } else if (role === Role.SURGEON) {
                try {
                    await SurgeonEp.register(req, res, next);
                } catch (e) {
                    res.sendError(e);
                }
            } else if (role === Role.DOCTOR) {
                try {
                    await DoctorEp.register(req, res, next);
                } catch (e) {
                    res.sendError(e);
                }
            } else if (role === Role.ADMIN) {
                res.sendError('Admin: Unauthorized Role!');
            } else {
                res.sendError('Role Required!');
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
