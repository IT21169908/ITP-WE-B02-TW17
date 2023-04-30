import {NextFunction, Request, Response} from "express";
import {Types} from "mongoose";
import * as ScheduleDao from "../dao/Schedule.dao";
import {validationsChecker} from "../middleware/validations/validation-handler";
import {ScheduleValidations} from "../middleware/validations/schedule-validations";
import {DSchedule} from "../models/Schedule.model";
import {IUser} from "../models/User.model";


// ================ VALIDATIONS ================
export function createScheduleValidationRules() {
    return [
        ScheduleValidations.surgeonId(),
        ScheduleValidations.patientId(),
        ScheduleValidations.scheduleDate(),
    ];
}

export function updateScheduleValidationRules() {
    return [ScheduleValidations.scheduleId()];
}

export function fetchScheduleValidationRules() {
    return [ScheduleValidations.scheduleId()];
}

// ================ CREATE - C ================
export async function create(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        const user = req.user as IUser;
        const {surgeonId, patientId, schedule, scheduleDate, remark, status} = req.body;
        const data: DSchedule = {
            surgeonId: surgeonId,
            patientId: patientId,
            schedule: schedule,
            scheduleDate: scheduleDate,
            remark: remark,
            status: status,
        };
        await ScheduleDao.createSchedule(data, user).then(schedule => {
            res.sendSuccess(schedule, "Schedule created successfully!");
        }).catch(next);
    }
}

// ================ READ - R ================
export async function getAll(req: Request, res: Response, next: NextFunction) {
    const user = req.user as IUser;
    await ScheduleDao.getAllSchedules(user).then(schedules => {
        res.sendSuccess(schedules, "Get all schedules successfully!");
    }).catch(next);
}

export function getById(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        const user = req.user as IUser;
        const scheduleId = req.params._id as unknown as Types.ObjectId;
        ScheduleDao.getScheduleById(scheduleId, user).then(schedule => {
            res.sendSuccess(schedule, "Get schedule by ID successfully!");
        }).catch(next);
    }
}

// ================ UPDATE - U ================
export async function update(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        const user = req.user as IUser;
        const {_id: scheduleId, surgeonId, patientId, scheduleDate, remark, status} = req.body;
        const scheduleDetails: Partial<DSchedule> = {
            surgeonId: surgeonId,
            patientId: patientId,
            scheduleDate: scheduleDate,
            remark: remark,
            status: status,
        };
        await ScheduleDao.updateSchedule(scheduleId, scheduleDetails, user).then(schedule => {
            res.sendSuccess(schedule, "Schedule updated successfully!");
        }).catch(next);
    }
}

// ================ DELETE - D ================
export function deleteSchedule(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        const scheduleId = req.params._id as unknown as Types.ObjectId;
        const user = req.user as IUser;
        ScheduleDao.deleteScheduleById(scheduleId, user).then(schedule => {
            res.sendSuccess(schedule, "Schedule updated successfully!");
        }).catch(next);
    }
}