import * as mongoose from "mongoose";
import { StringOrObjectId } from "../utils/utils";
import { Permission, Role } from "../enums/auth";
import { IUpload } from "./Upload.model";

interface CommonAttributes {
    name: string;
    email: string;
    password: string;
    phone?: string;
    permissions?: Permission[];
    role?: Role;
    lastLoggedIn?: Date;
    signedUpAs? : string;
}

export interface DUser extends CommonAttributes {
    _id?: StringOrObjectId;
    photo?: StringOrObjectId;
}

export interface IUser extends CommonAttributes, mongoose.Document {
    readonly role: Role;
    permissions: Permission[];
    lastLoggedIn: Date;
    photo?: IUpload;

    createAccessToken(expiresIn?: string): string;

    comparePassword(password: string): Promise<boolean>;

    hasPermission(...permissions: Permission[]): boolean;
}
