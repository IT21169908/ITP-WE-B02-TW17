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
import {getRoleTitle} from "../utils/utils";
import {AuthUserData} from "../types/util-types";
import {UserValidations} from "../middleware/validations/user-validations";
import {Types} from "mongoose";

export function createUserValidationRules() {
    return [
        UserValidations.name(),
        UserValidations.email(),
        UserValidations.phone(),
        UserValidations.role([0, 1, 2, 3, 4,]),
        UserValidations.name(),
    ];
}

export function updateUserValidationRules() {
    return [
        UserValidations.userId(),
        UserValidations.name(),
        UserValidations.email(),
        UserValidations.phone(),
    ];
}

export function fetchUserValidationRules() {
    return [UserValidations.userId()];
}

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
                res.cookie('token', data.token, {httpOnly: true, secure: false, maxAge: 3600000 * 24 * 30}); // TODO set same expiration set to jwt token
                //const user = await User.findOne({email: req.body.email}); // TODO: REFACTOR
                res.sendSuccess(data, `User Logged as ${getRoleTitle(data.user.role)}!`);
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

export async function getAll(req: Request, res: Response, next: NextFunction) {
    const user = req.user as IUser;
    await UserDao.getAllUsers(user).then(user => {
        res.sendSuccess(user, "Get all Users successfully!");
    }).catch(next);
}

export function getSelf(req: Request, res: Response, next: NextFunction) {
    const user = req.user as IUser;
    AppLogger.info(`Get user for id ${user._id}`);
    UserDao.getUser(user._id).then((user: IUser) => {
        AppLogger.info(`Found user ${!!user}`);
        res.sendSuccess(user);
    }).catch(next);
}

export function show(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        const userId = req.params._id as unknown as Types.ObjectId;
        UserDao.getUser(userId).then(user => {
            res.sendSuccess(user, "Get user by ID successfully!");
        }).catch(next);
    }
}

export async function update(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        const _id = req.params._id as unknown as Types.ObjectId;
        const {email, phone, name} = req.body;
        const emailCheckUser = await UserDao.getUserByEmail(email);
        const user = await UserDao.getUser(_id);
        const loggedUser = req.user as IUser;

        AppLogger.warn(`emailCheckUser ID: ${emailCheckUser?._id} | update user ID: ${user?._id}`);
        AppLogger.warn(`emailCheckUser: ${emailCheckUser?.email} | update user: ${user?.email}`);

        if (!emailCheckUser || emailCheckUser._id.equals(user._id)) {
            const userDetails: Partial<IUser> = {
                email: email,
                phone: phone,
                name: name,
            };
            await UserDao.update(_id, userDetails, loggedUser).then(user => {
                res.sendSuccess(user, "User updated successfully!");
            }).catch(next);
        } else {
            res.sendError(`User Email Already exists`, 422);
        }

    }
}

// ================ DELETE - D ================
export function destroy(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        const user_id = req.params._id as unknown as Types.ObjectId;
        const user = req.user as IUser;
        UserDao.destroy(user_id, user).then(user => {
            res.sendSuccess(user, "User deleted successfully!");
        }).catch(next);
    }
}
