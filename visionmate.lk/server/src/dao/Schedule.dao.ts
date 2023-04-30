import { Types } from "mongoose";
import { DSchedule, ISchedule } from "../models/Schedule.model";
import { IUser } from "../models/User.model";
import Schedule from "../schemas/Schedule.schema";
import { ApplicationError } from "../utils/application-error";
import { AppLogger } from "../utils/logging";
import { getRoleTitle } from "../utils/utils";

export async function createSchedule(data: DSchedule, user?: IUser): Promise<ISchedule> {
    try {
        const iSchedules = new Schedule(data);
        const schedule = await iSchedules.save();
        AppLogger.info(`Create Schedule(ID: ${schedule._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return schedule;
    } catch (error: unknown) {
        if (error instanceof Error) {
            AppLogger.error(`Creating Schedule: ${error.message}`);
            throw new ApplicationError(`Creating schedule: ${error.message}`);
        }
        throw error;
    }
}

export async function getAllSchedules(user?: IUser): Promise<ISchedule[]> {
    const schedules = await Schedule.find();
    if (schedules) {
        AppLogger.info(`Got All Schedules - Count: ${schedules.length} by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return schedules;
    } else {
        AppLogger.info(`Schedules Not Found`);
        throw new ApplicationError(`Get all schedules: Schedules not found!`);
    }
}

export async function getScheduleById(scheduleId: Types.ObjectId, user?: IUser): Promise<ISchedule> {
    const schedule = await Schedule.findById(scheduleId);
    if (schedule) {
        AppLogger.info(`Got Schedule(ID: ${schedule._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return schedule;
    } else {
        AppLogger.info(`Schedule(ID: ${scheduleId}) Not Found`);
        throw new ApplicationError(`Get Schedule: Schedule not found for ID: ${scheduleId} !`);
    }
}

export async function updateSchedule(scheduleId: Types.ObjectId, scheduleDetails: Partial<DSchedule>, user?: IUser): Promise<ISchedule> {
    const updatedSchedule = await Schedule.findByIdAndUpdate(scheduleId, scheduleDetails as any, {new: true});
    if (updatedSchedule) {
        AppLogger.info(`Update Schedule(ID: ${updatedSchedule._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return updatedSchedule;
    } else {
        AppLogger.info(`Schedule(ID: ${scheduleId}) Not Found`);
        throw new ApplicationError(`Update schedule: Schedule not found for ID: ${scheduleId} !`);
    }
}

export async function deleteScheduleById(scheduleId: Types.ObjectId, user?: IUser): Promise<ISchedule> {
    const deletedSchedule = await Schedule.findOneAndDelete({_id: scheduleId});
    if (deletedSchedule) {
        AppLogger.info(`Got Delete Schedule(ID: ${deletedSchedule._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return deletedSchedule;
    } else {
        AppLogger.info(`Schedule(ID: ${scheduleId}) not found`);
        throw new ApplicationError(`Delete schedule: Schedule not found for ID: ${scheduleId} !`);
    }
}
