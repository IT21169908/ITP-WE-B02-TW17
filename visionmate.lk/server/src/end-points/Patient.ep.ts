import {NextFunction, Request, Response} from "express";
import * as PatientDao from "../dao/Patient.dao";
import { SignedUpAs } from "../enums/auth";
import { DPatient } from "../models/Patient.model";

export async function register(req: Request, res: Response, next: NextFunction) {
    const {role, name, email, password} = req.body;
    const data: DPatient = {
        lastLoggedIn: undefined,
        email: email,
        name: name,
        password: password,
        about: "about me",
        signedUpAs: SignedUpAs.EMAIL,
    };
    PatientDao.createProfile(data, !!req.body.remember).then(async token => {
        res.sendSuccess(token);
    }).catch(next);
}
