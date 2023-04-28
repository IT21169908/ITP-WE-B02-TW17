import { DUser, IUser } from "./User.model";

interface CommonAttributes {
    about?: string;
}

export interface DStaffschedule extends CommonAttributes, DUser {
    socialLinks?: []; // not related, just added
}

export interface IStaffschedule extends CommonAttributes, IUser {
    socialLinks?: [];
}