import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import * as AppointmentTransactionDao from "../dao/AppointmentTransaction.dao";
import { AppointmentValidations } from "../middleware/validations/appointment-validations";
import { validationsChecker } from "../middleware/validations/validation-handler";
import { DAppointmentTransaction } from "../models/AppointmentTransaction.model";
import { IUser } from "../models/User.model";

// ================ VALIDATIONS ================
export function createAppointmentTransactionValidationRules() {
    return [
        AppointmentValidations.appointmentIdOnTransaction(),
        AppointmentValidations.type(),
        AppointmentValidations.amount(),
        AppointmentValidations.transactionStatus(),
    ];
}

export function updateAppointmentTransactionValidationRules() {
    return [AppointmentValidations.appointmentTransactionId()];
}

export function fetchAppointmentTransactionValidationRules() {
    return [AppointmentValidations.appointmentTransactionId()];
}

// ================ CREATE - C ================
export async function create(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        const user = req.user as IUser;
        const {appointmentId, type, amount, transactionDate, transactionStatus} = req.body;
        const data: DAppointmentTransaction = {
            appointmentId: appointmentId,
            type: type,
            amount: amount,
            transactionDate: new Date(transactionDate),
            transactionStatus: transactionStatus
        };
        await AppointmentTransactionDao.createAppointmentTransaction(data, user).then(appointmentTransaction => {
            res.sendSuccess(appointmentTransaction, "Appointment transaction created successfully!");
        }).catch(next);
    }
}

// ================ READ - R ================
export async function getAll(req: Request, res: Response, next: NextFunction) {
    const user = req.user as IUser;
    await AppointmentTransactionDao.getAllAppointmentTransactions(user).then(appointmentTransactions => {
        res.sendSuccess(appointmentTransactions, "Get all appointment transactions successfully!");
    }).catch(next);
}

export function getById(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        const user = req.user as IUser;
        const appointmentTransactionId = req.params._id as unknown as Types.ObjectId;
        AppointmentTransactionDao.getAppointmentTransactionById(appointmentTransactionId, user).then(appointmentTransaction => {
            res.sendSuccess(appointmentTransaction, "Get appointment transaction by ID successfully!");
        }).catch(next);
    }
}

// ================ UPDATE - U ================
export async function update(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        const user = req.user as IUser;
        const {_id: appointmentTransactionId, appointmentId, type, amount, transactionDate, transactionStatus} = req.body;
        const appointmentTransactionDetails: Partial<DAppointmentTransaction> = {
            appointmentId: appointmentId,
            type: type,
            amount: amount,
            transactionDate: new Date(transactionDate),
            transactionStatus: transactionStatus
        };
        await AppointmentTransactionDao.updateAppointmentTransaction(appointmentTransactionId, appointmentTransactionDetails, user).then(appointmentTransaction => {
            res.sendSuccess(appointmentTransaction, "Appointment transaction updated successfully!");
        }).catch(next);
    }
}

// ================ DELETE - D ================
export function deleteTransaction(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        const appointmentId = req.params._id as unknown as Types.ObjectId;
        const user = req.user as IUser;
        AppointmentTransactionDao.deleteAppointmentTransactionById(appointmentId, user).then(appointment => {
            res.sendSuccess(appointment, "Appointment updated successfully!");
        }).catch(next);
    }
}
