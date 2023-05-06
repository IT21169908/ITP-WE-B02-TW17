import { NextFunction, Request, Response } from "express";
import * as PatientDao from "../dao/Patient.dao";
import * as UserDao from "../dao/User.dao";
import { SignedUpAs } from "../enums/auth";
import { DPatient } from "../models/Patient.model";
import { AuthUserData } from "../types/util-types";
import { AppLogger } from "../utils/logging";
import { getRoleTitle } from "../utils/utils";

export async function register(req: Request, res: Response, next: NextFunction) {
    const {_id: id, role, name, email, password} = req.body;
    const data: DPatient = {
        lastLoggedIn: undefined,
        email: email,
        name: name,
        password: password,
        about: "",
        signedUpAs: SignedUpAs.EMAIL,
    };
    PatientDao.createProfile(data, !!req.body.remember).then(async (data: AuthUserData) => {
        AppLogger.info(`User Registered as ${getRoleTitle(role)} ID: ${id}`);
        res.sendSuccess(data, `User Registered as ${getRoleTitle(role)}!`);
    }).catch(next);
}
