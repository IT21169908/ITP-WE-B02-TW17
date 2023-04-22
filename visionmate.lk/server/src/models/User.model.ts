import * as mongoose from "mongoose";
import { Types } from "mongoose";
import { Permission, Role } from "../enums/auth";

interface CommonAttributes {
    name: string;
    email?: string;
    password?: string;
    phone?: string;
    // permissions?: Permission[];
    role: Role;
    lastLoggedIn?: Date;
}

export interface DUser extends CommonAttributes {
    _id?: Types.ObjectId;
    photo?: Types.ObjectId;
}

export interface IUser extends CommonAttributes, mongoose.Document {
    readonly role: Role;
    // permissions: Permission[];
    lastLoggedIn: Date;
    // photo?: IUpload;

    createAccessToken(expiresIn?: string): string;

    comparePassword(password: string): Promise<boolean>;

    hasPermission(...permissions: Permission[]): boolean;
}
