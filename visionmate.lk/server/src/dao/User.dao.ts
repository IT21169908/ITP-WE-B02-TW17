import {PopulateOptions, Types} from "mongoose";
import {Role, SignedUpAs} from "../enums/auth";
import {IUser} from "../models/User.model";
import User from "../schemas/User.schema";
import {AuthUserData} from "../types/util-types";
import {ApplicationError} from "../utils/application-error";
import {AppLogger} from "../utils/logging";
import {getRoleTitle} from "../utils/utils";

const commonPopulates: PopulateOptions[] = [{path: 'photo'}];
const adminPopulates = [...commonPopulates, {path: 'company', populate: [{path: 'logo'}]}];
const patientPopulates = [...commonPopulates];
const surgeonPopulates = [...commonPopulates];

function getPopulatesForRole(role: Role): PopulateOptions[] {
    switch (role) {
        case Role.ADMIN:
            return adminPopulates;
        case Role.PATIENT:
            return patientPopulates;
        case Role.SURGEON:
            return surgeonPopulates;
        default:
            return commonPopulates;
    }
}

export async function authenticateUser(email: string, password: string, signedUpAs: string | undefined, remember: boolean): Promise<AuthUserData> {
    if (signedUpAs === SignedUpAs.EMAIL) {
        const user = await User.findOne({email: email});
        if (user) {
            AppLogger.info(`User Logged In as ${signedUpAs} ID: ${user._id}`);
            const token = user.createAccessToken(remember ? "365 days" : "24 hours");
            return {token: token, user: user};
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
        AppLogger.info(`User Logged In as ${SignedUpAs.EMAIL} ID: ${user._id}`);
        const token = user.createAccessToken(remember ? "365 days" : "24 hours");
        return {token: token, user: user};
    } else {
        throw new ApplicationError('User not found in the system!');
    }
}

export async function getAllUsers(user?: IUser): Promise<IUser[]> {
    const users = await User.find();
    if (users) {
        AppLogger.info(`Got All Users - Count: ${users.length} by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return users;
    } else {
        AppLogger.info(`Users Not Found`);
        throw new ApplicationError(`Get all users: Users not found!`);
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
    const populates = getPopulatesForRole(user.role);
    // await user.populate(populates).execPopulate();
    await user.populate(populates);
    return user;
}

export async function getUserByEmail(email: string): Promise<IUser | null> {
    const user = await User.findOne({email}).populate(commonPopulates);
    AppLogger.info(`Got user for id, userID: ${user ? user._id : null}`);
    if (user) {
        const populates = getPopulatesForRole(user.role);
        // return user.populate(populates).execPopulate();
        return user.populate(populates);
    } else {
        return null;
    }
}

export async function update(userId: Types.ObjectId, spectacleDetails: Partial<IUser>, user?: IUser): Promise<IUser> {
    const updatedUser = await User.findByIdAndUpdate(userId, spectacleDetails as any, {new: true});
    if (updatedUser) {
        AppLogger.info(`Update User(ID: ${updatedUser._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return updatedUser;
    } else {
        AppLogger.info(`User(ID: ${userId}) Not Found`);
        throw new ApplicationError(`Update spectacle: User not found for ID: ${userId} !`);
    }
}

export async function destroy(userId: Types.ObjectId, user?: IUser): Promise<IUser> {
    if (user?._id === userId) {
        AppLogger.info(`cannot delete logged user - User(ID: ${userId})`);
        throw new ApplicationError(`Delete user: Cannot Delete user ID: ${userId} !`);
    }

    const choseUser = await User.findById(userId);
    if (choseUser?.role === Role.ADMIN) {
        AppLogger.info(`cannot delete admin users - User(ID: ${userId})`);
        throw new ApplicationError(`Delete user: Cannot Delete admin user for ID: ${userId} !`);
    }

    const deletedUser = await User.findOneAndDelete({_id: userId});
    if (deletedUser) {
        AppLogger.info(`Got Delete User(ID: ${deletedUser._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return deletedUser;
    } else {
        AppLogger.info(`User(ID: ${userId}) not found`);
        throw new ApplicationError(`Delete user: User not found for ID: ${userId} !`);
    }
}
