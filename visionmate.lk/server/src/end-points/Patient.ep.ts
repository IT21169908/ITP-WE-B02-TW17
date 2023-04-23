import {NextFunction, Request, Response} from "express";
import { PatientDao } from "../dao/Patient.dao";
import { SignedUpAs } from "../enums/auth";
import { DPatient } from "../models/Patient.model";
import {AppLogger} from "../utils/logging";

export namespace PatientEp {

    export async function register(req: Request, res: Response, next: NextFunction) {
        let {role, name, email, password} = req.body;
        // const errors = validationResult(req);  //TODO Add validations
        // if (!errors.isEmpty()) {
        //     return res.sendError(errors.array()[0]['msg']);
        // }
        const data: DPatient = {
            lastLoggedIn: undefined,
            email: email,
            name: name,
            password: password,
            signedUpAs: SignedUpAs.EMAIL,
        };
        PatientDao.createProfile(data, !!req.body.remember).then(async token => {
            res.sendSuccess(token);
        }).catch(next);
    }

}
