import * as mongoose from "mongoose";
import { IUser } from "../models/User.model";

export type ObjectIdOr<T extends mongoose.Document> = mongoose.Types.ObjectId | T;

export type StringOrObjectId = string | mongoose.Types.ObjectId;

export interface AuthUserData {
    token: string,
    user: IUser
}
