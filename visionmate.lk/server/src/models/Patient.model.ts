
import { DUser, IUser } from "./User.model";

interface CommonAttributes {
    about?: string;
}

export interface DPatient extends CommonAttributes, DUser {
    socialLinks?: []; // not related, just added
}

export interface IPatient extends CommonAttributes, IUser {
    socialLinks?: [];
}
