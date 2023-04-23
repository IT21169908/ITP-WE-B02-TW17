import { PopulateOptions, Types } from "mongoose";
import { Role, SignedUpAs } from "../enums/auth";
import { IUser } from "../models/User.model";
import User from "../schemas/User.schema";
import { ApplicationError } from "../utils/application-error";
import { AppLogger } from "../utils/logging";

export namespace UserDao {
    const commonPopulates: PopulateOptions[] = [{path: 'photo'}, {path: 'logo'}];
    const adminPopulates = [...commonPopulates, {path: 'company', populate: [{path: 'logo'}]}];
    const patientPopulates = [...commonPopulates];

    function getPopulatesForRole(role: Role): PopulateOptions[] {
        switch (role) {
            case Role.ADMIN:
                return adminPopulates;
            case Role.PATIENT:
                return patientPopulates;
            default:
                return commonPopulates;
        }
    }

    export async function authenticateUser(email: string, password: string, signedUpAs: string|undefined, remember: boolean): Promise<string> {
        if (signedUpAs === SignedUpAs.EMAIL) {
            const user = await User.findOne({email: email});
            if (user) {
                return user.createAccessToken(remember ? "365 days" : "24 hours");
            } else {
                throw new ApplicationError('User not found in the system!');
            }
        }
        // else if (signedUpAs === SignedUpAs.FACEBOOK) {
        //     const user: IUser = await User.findOne({facebookId: facebookId});
        //     if (user) {
        //         return user.createAccessToken(remember ? "365 days" : "24 hours");
        //     } else {
        //         throw new ApplicationError('User not found in the system!');
        //     }
        // }
        // else if (signedUpAs === SignedUpAs.GOOGLE) {
        //     const user: IUser = await User.findOne({email: email});
        //     if (user) {
        //         return user.createAccessToken(remember ? "365 days" : "24 hours");
        //     } else {
        //         throw new ApplicationError('User not found in the system!');
        //     }
        // }

        const user = await User.findOne({email: email});
        if (user) {
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                throw new ApplicationError('Incorrect email/password combination!');
            }
            return user.createAccessToken(remember ? "365 days" : "24 hours");
        } else {
            throw new ApplicationError('User not found in the system!');
        }
    }

    export async function getUser(id: Types.ObjectId): Promise<IUser> {
        const user = await User.findById(id).populate(commonPopulates);
        if (!user) {
            throw new ApplicationError("User not found for ID: " + id);
        }
        AppLogger.info(`Got user for id, userID: ${user._id}`);
        user.lastLoggedIn = new Date();
        await user.save();
        let populates = getPopulatesForRole(user.role);
        // await user.populate(populates).execPopulate();
        await user.populate(populates);
        return user;
    }

    export async function getUserByEmail(email: string): Promise<IUser|null> {
        let user = await User.findOne({email}).populate(commonPopulates);
        AppLogger.info(`Got user for id, userID: ${user ? user._id : null}`);
        if(user) {
            let populates = getPopulatesForRole(user.role);
            // return user.populate(populates).execPopulate();
            return user.populate(populates);
        } else {
            return user;
        }
    }

}
