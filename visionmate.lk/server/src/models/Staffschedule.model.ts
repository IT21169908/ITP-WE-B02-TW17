import { DUser, IUser } from "./User.model";

interface CommonAttributes {
    about?: string;
}

export interface DStaffSchedule extends CommonAttributes, DUser {
    socialLinks?: []; // not related, just added
}

export interface IStaffSchedule extends CommonAttributes, IUser {
    socialLinks?: [];
}
