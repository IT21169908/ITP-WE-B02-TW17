import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import * as AppointmentDao from "../dao/Appointment.dao";
import { AppointmentValidations } from "../middleware/validations/appointment-validations";
import { validationsChecker } from "../middleware/validations/validation-handler";
import { DAppointment } from "../models/Appointment.model";
import { IUser } from "../models/User.model";

// ================ VALIDATIONS ================
export function createAppointmentValidationRules() {
    return [
        AppointmentValidations.title(),
        AppointmentValidations.description(),
    ];
}

export function updateAppointmentValidationRules() {
    return [AppointmentValidations.appointmentId()];
}

export function fetchAppointmentValidationRules() {
    return [AppointmentValidations.appointmentId()];
}

// ================ CREATE - C ================
export async function create(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        const user = req.user as IUser;
        const {title, description, tags, reference, notes, appointmentDate, duration} = req.body;
        const data: DAppointment = {
            title: title,
            description: description,
            tags: tags,
            reference: reference,
            notes: notes,
            // patientId: "",
            // doctorId: "",
            appointmentDate: new Date(),
            duration: 2,
            // invoiceId: "",
        };
        await AppointmentDao.createAppointment(data, user).then(appointment => {
            res.sendSuccess(appointment, "Appointment created successfully!");
        }).catch(next);
    }
}

// ================ READ - R ================
export async function getAll(req: Request, res: Response, next: NextFunction) {
    const user = req.user as IUser;
    await AppointmentDao.getAllAppointments(user).then(appointments => {
        res.sendSuccess(appointments, "Get all appointments successfully!");
    }).catch(next);
}

export function getById(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        const user = req.user as IUser;
        const appointmentId = req.params._id as unknown as Types.ObjectId;
        AppointmentDao.getAppointmentById(appointmentId, user).then(appointment => {
            res.sendSuccess(appointment, "Get appointment by ID successfully!");
        }).catch(next);
    }
}

// ================ UPDATE - U ================
export async function update(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        const user = req.user as IUser;
        const {_id: appointmentId, title, description, tags, reference, notes, appointmentDate, duration} = req.body;
        const appointmentDetails: Partial<DAppointment> = {
            title: title,
            description: description,
            tags: tags,
            reference: reference,
            notes: notes,
            // patientId: patientId,
            // doctorId: doctorId,
            duration: duration,
            // invoiceId: "",
        };
        await AppointmentDao.updateAppointment(appointmentId, appointmentDetails, user).then(appointment => {
            res.sendSuccess(appointment, "Appointment updated successfully!");
        }).catch(next);
    }
}

// ================ DELETE - D ================
export function deleteAppointment(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        const appointmentId = req.params._id as unknown as Types.ObjectId;
        const user = req.user as IUser;
        AppointmentDao.deleteAppointmentById(appointmentId, user).then(appointment => {
            res.sendSuccess(appointment, "Appointment updated successfully!");
        }).catch(next);
    }
}
