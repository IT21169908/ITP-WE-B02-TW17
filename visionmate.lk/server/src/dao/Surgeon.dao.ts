import { DSurgeon } from "../models/Surgeon.model";
import { DUser } from "../models/User.model";
import Surgeon from "../schemas/Surgeon.schema";
import { AuthUserData } from "../types/util-types";
import { AppLogger } from "../utils/logging";
import * as UserDao from "./User.dao";

export async function createProfile(data: DUser & Partial<DSurgeon>, remember: boolean): Promise<AuthUserData> {
    const iSurgeon = new Surgeon(data);
    const surgeon = await iSurgeon.save();
    AppLogger.info(`Create profile for user ID: ${surgeon._id}`);
    // TODO fire event to send emails
    return await UserDao.authenticateUser(data.email, data.password, data.signedUpAs, remember);
}
