import { NextFunction, Request, Response } from "express";
import * as DoctorDao from "../dao/Doctor.dao";
import { SignedUpAs } from "../enums/auth";
import { DDoctor } from "../models/Doctor.model";
import { AuthUserData } from "../types/util-types";
import { AppLogger } from "../utils/logging";
import { getRoleTitle } from "../utils/utils";

export async function register(req: Request, res: Response, next: NextFunction) {
    const {_id: id, role, name, email, password} = req.body;
    const data: DDoctor = {
        lastLoggedIn: undefined,
        email: email,
        name: name,
        password: password,
        about: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
        isActive: false,
        specialties: [],
        education: [],
        experience: [],
        languages: [],
        awards: [],
        signedUpAs: SignedUpAs.EMAIL,
    };
    DoctorDao.createProfile(data, !!req.body.remember).then(async (data: AuthUserData) => {
        AppLogger.info(`User Registered as ${getRoleTitle(role)} ID: ${id}`);
        res.sendSuccess(data, `User Registered as ${getRoleTitle(role)}!`);
    }).catch(next);
}
