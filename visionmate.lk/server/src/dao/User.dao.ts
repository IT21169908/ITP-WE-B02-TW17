import { Types } from "mongoose";
import { IUser } from "../models/User.model";

export namespace UserDao {

    export async function getUser(id: Types.ObjectId): Promise<IUser> {
        return {} as IUser;
    }

}
