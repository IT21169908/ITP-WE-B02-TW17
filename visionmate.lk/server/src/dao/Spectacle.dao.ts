import {Types} from "mongoose";
import {DSpectacle, ISpectacle} from "../models/Spectacle.model";
import {IUser} from "../models/User.model";
import Spectacle from "../schemas/Spectacle.schema";
import {ApplicationError} from "../utils/application-error";
import {AppLogger} from "../utils/logging";
import {getRoleTitle} from "../utils/utils";


export async function getAll(user?: IUser): Promise<ISpectacle[]> {
    const spectacles = await Spectacle.find();
    if (spectacles) {
        AppLogger.info(`Got All Spectacles - Count: ${spectacles.length} by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return spectacles;
    } else {
        AppLogger.info(`Spectacles Not Found`);
        throw new ApplicationError(`Get all spectacles: Spectacles not found!`);
    }
}

export async function find(spectacleId: Types.ObjectId, user?: IUser): Promise<ISpectacle> {
    const spectacle = await Spectacle.findById(spectacleId);
    if (spectacle) {
        AppLogger.info(`Got Spectacle(ID: ${spectacle._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return spectacle;
    } else {
        AppLogger.info(`Spectacle(ID: ${spectacleId}) Not Found`);
        throw new ApplicationError(`Get Spectacle: Spectacle not found for ID: ${spectacleId} !`);
    }
}

export async function store(data: DSpectacle, user?: IUser): Promise<ISpectacle> {
    try {
        const iSpectacles = new Spectacle(data);
        const spectacle = await iSpectacles.save();
        AppLogger.info(`Create Spectacle(ID: ${spectacle._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return spectacle;
    } catch (error: unknown) {
        if (error instanceof Error) {
            AppLogger.error(`Creating Spectacle: ${error.message}`);
            throw new ApplicationError(`Creating spectacle: ${error.message}`);
        }
        throw error;
    }
}

export async function update(spectacleId: Types.ObjectId, spectacleDetails: Partial<DSpectacle>, user?: IUser): Promise<ISpectacle> {
    const updatedSpectacle = await Spectacle.findByIdAndUpdate(spectacleId, spectacleDetails as any, {new: true});
    if (updatedSpectacle) {
        AppLogger.info(`Update Spectacle(ID: ${updatedSpectacle._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return updatedSpectacle;
    } else {
        AppLogger.info(`Spectacle(ID: ${spectacleId}) Not Found`);
        throw new ApplicationError(`Update spectacle: Spectacle not found for ID: ${spectacleId} !`);
    }
}

export async function destroy(spectacleId: Types.ObjectId, user?: IUser): Promise<ISpectacle> {
    const deletedSpectacle = await Spectacle.findOneAndDelete({_id: spectacleId});
    if (deletedSpectacle) {
        AppLogger.info(`Got Delete Spectacle(ID: ${deletedSpectacle._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return deletedSpectacle;
    } else {
        AppLogger.info(`Spectacle(ID: ${spectacleId}) not found`);
        throw new ApplicationError(`Delete spectacle: Spectacle not found for ID: ${spectacleId} !`);
    }
}