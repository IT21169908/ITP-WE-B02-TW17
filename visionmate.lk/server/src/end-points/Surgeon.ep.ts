import { NextFunction, Request, Response } from "express";
import * as SurgeonDao from "../dao/Surgeon.dao";
import { SignedUpAs } from "../enums/auth";
import { DSurgeon } from "../models/Surgeon.model";
import { AppLogger } from "../utils/logging";
import { getRoleTitle } from "../utils/utils";

export async function register(req: Request, res: Response, next: NextFunction) {
    const {_id: id, role, name, email, password} = req.body;
    const data: DSurgeon = {
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
        surgeriesPerformed: 0,
        specialties: [],
        education: [],
        status: "",
        signedUpAs: SignedUpAs.EMAIL,
    };
    SurgeonDao.createProfile(data, !!req.body.remember).then(async token => {
        AppLogger.info(`User Registered as ${getRoleTitle(role)} ID: ${id}`);
        res.sendSuccess(token);
    }).catch(next);
}
