import { Types } from "mongoose";
import { DTreatmentPlan, ITreatmentPlan } from "../models/TreatmentPlan.model";
import { IUser } from "../models/User.model";
import TreatmentPlan from "../schemas/TreatmentPlan.schema";
import { ApplicationError } from "../utils/application-error";
import { AppLogger } from "../utils/logging";
import { getRoleTitle } from "../utils/utils";

export async function createTreatmentPlan(data: DTreatmentPlan, user?: IUser): Promise<ITreatmentPlan> {
    try {
        const iTreatmentPlan = new TreatmentPlan(data);
        const treatmentPlan = await iTreatmentPlan.save();
        AppLogger.info(`Create Treatment Plan(ID: ${treatmentPlan._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return treatmentPlan;
    } catch (error: unknown) {
        if (error instanceof Error) {
            AppLogger.error(`Creating Treatment Plan: ${error.message}`);
            throw new ApplicationError(`Creating treatment plan: ${error.message}`);
        }
        throw error;
    }
}

export async function getAllTreatmentPlans(user?: IUser): Promise<ITreatmentPlan[]> {
    const treatmentPlans = await TreatmentPlan.find();
    if (treatmentPlans) {
        AppLogger.info(`Got All Treatment Plans - Count: ${treatmentPlans.length} by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return treatmentPlans;
    } else {
        AppLogger.info(`Treatment Plans Not Found`);
        throw new ApplicationError(`Get all treatment plans: Treatment plans not found!`);
    }
}

export async function getTreatmentPlanById(treatmentPlanId: Types.ObjectId, user?: IUser): Promise<ITreatmentPlan> {
    const treatmentPlan = await TreatmentPlan.findById(treatmentPlanId);
    if (treatmentPlan) {
        AppLogger.info(`Got Treatment Plan(ID: ${treatmentPlan._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return treatmentPlan;
    } else {
        AppLogger.info(`Treatment Plan(ID: ${treatmentPlanId}) Not Found`);
        throw new ApplicationError(`Get Treatment Plan: Treatment plan not found for ID: ${treatmentPlanId} !`);
    }
}

export async function updateTreatmentPlan(treatmentPlanId: Types.ObjectId, treatmentPlanDetails: Partial<DTreatmentPlan>, user?: IUser): Promise<ITreatmentPlan> {
    const updatedTreatmentPlan = await TreatmentPlan.findByIdAndUpdate(treatmentPlanId, treatmentPlanDetails as any, {new: true});
    if (updatedTreatmentPlan) {
        AppLogger.info(`Update Treatment Plan(ID: ${updatedTreatmentPlan._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return updatedTreatmentPlan;
    } else {
        AppLogger.info(`Treatment Plan(ID: ${treatmentPlanId}) Not Found`);
        throw new ApplicationError(`Update treatment plan: Treatment plan not found for ID: ${treatmentPlanId} !`);
    }
}

export async function deleteTreatmentPlanById(treatmentPlanId: Types.ObjectId, user?: IUser): Promise<ITreatmentPlan> {
    const deletedTreatmentPlan = await TreatmentPlan.findOneAndDelete({_id: treatmentPlanId});
    if (deletedTreatmentPlan) {
        AppLogger.info(`Got Delete TreatmentPlan(ID: ${deletedTreatmentPlan._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return deletedTreatmentPlan;
    } else {
        AppLogger.info(`TreatmentPlan(ID: ${treatmentPlanId}) not found`);
        throw new ApplicationError(`Delete treatment plan: Treatment plan not found for ID: ${treatmentPlanId} !`);
    }
}
