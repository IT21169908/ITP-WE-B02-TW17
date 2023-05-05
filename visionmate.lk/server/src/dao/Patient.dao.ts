import { DPatient } from "../models/Patient.model";
import { DUser } from "../models/User.model";
import Patient from "../schemas/Patient.schema";
import { AuthUserData } from "../types/util-types";
import { AppLogger } from "../utils/logging";
import * as UserDao from "./User.dao";

export async function createProfile(data: DUser & Partial<DPatient>, remember: boolean): Promise<AuthUserData> {
    const iPatient = new Patient(data);
    const patient = await iPatient.save();
    AppLogger.info(`Create profile for user ID: ${patient._id}`);
    // TODO fire event to send emails
    return await UserDao.authenticateUser(data.email, data.password, data.signedUpAs, remember);
}
