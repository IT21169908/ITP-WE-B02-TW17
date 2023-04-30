import {check} from "express-validator";
import mongoose from "mongoose";

export const ScheduleValidations = {
    surgeonId: () => check('surgeonId')
        .trim()
        .isString()
        .not()
        .isEmpty()
        .withMessage('Surgeon ID is required!'),
    patientId: () => check('patientId')
        .trim()
        .isString()
        .not()
        .isEmpty()
        .withMessage('Patient ID is required!'),
    schedule: () => check('schedule')
        .not()
        .isEmpty()
        .withMessage('schedule is required!'),
    scheduleDate: () => check('scheduleDate')
        .not()
        .isEmpty()
        .withMessage('Schedule date is required!')
        .isISO8601()
        .toDate()
        .withMessage('Schedule date must be a valid date in ISO8601 format!'),
    remark: () => check('remark')
        .trim()
        .isString(),
    status: () => check('status')
        .not()
        .isEmpty()
        .withMessage('Status is required!'),
    scheduleId: (key = "_id") => check(key)
        .not()
        .isEmpty()
        .withMessage(`${key} cannot be empty`)
        .custom((v) => mongoose.isValidObjectId(v))
        .withMessage(`${key} is not a valid mongoDb objectID`),
};