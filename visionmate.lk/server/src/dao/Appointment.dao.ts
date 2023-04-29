import { Types } from "mongoose";
import { DAppointment, IAppointment } from "../models/Appointment.model";
import { IUser } from "../models/User.model";
import Appointment from "../schemas/Appointment.schema";
import { ApplicationError } from "../utils/application-error";
import { AppLogger } from "../utils/logging";
import { getRoleTitle } from "../utils/utils";

export async function createAppointment(data: DAppointment, user?: IUser): Promise<IAppointment> {
    try {
        const iAppointments = new Appointment(data);
        const appointment = await iAppointments.save();
        AppLogger.info(`Create Appointment(ID: ${appointment._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return appointment;
    } catch (error: unknown) {
        if (error instanceof Error) {
            AppLogger.error(`Creating Appointment: ${error.message}`);
            throw new ApplicationError(`Creating appointment: ${error.message}`);
        }
        throw error;
    }
}

export async function getAllAppointments(user?: IUser): Promise<IAppointment[]> {
    const appointments = await Appointment.find();
    if (appointments) {
        AppLogger.info(`Got All Appointments - Count: ${appointments.length} by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return appointments;
    } else {
        AppLogger.info(`Appointments Not Found`);
        throw new ApplicationError(`Get all appointments: Appointments not found!`);
    }
}

export async function getAppointmentById(appointmentId: Types.ObjectId, user?: IUser): Promise<IAppointment> {
    const appointment = await Appointment.findById(appointmentId);
    if (appointment) {
        AppLogger.info(`Got Appointment(ID: ${appointment._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return appointment;
    } else {
        AppLogger.info(`Appointment(ID: ${appointmentId}) Not Found`);
        throw new ApplicationError(`Get Appointment: Appointment not found for ID: ${appointmentId} !`);
    }
}

export async function updateAppointment(appointmentId: Types.ObjectId, appointmentDetails: Partial<DAppointment>, user?: IUser): Promise<IAppointment> {
    const updatedAppointment = await Appointment.findByIdAndUpdate(appointmentId, appointmentDetails as any, {new: true});
    if (updatedAppointment) {
        AppLogger.info(`Update Appointment(ID: ${updatedAppointment._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return updatedAppointment;
    } else {
        AppLogger.info(`Appointment(ID: ${appointmentId}) Not Found`);
        throw new ApplicationError(`Update appointment: Appointment not found for ID: ${appointmentId} !`);
    }
}

export async function deleteAppointmentById(appointmentId: Types.ObjectId, user?: IUser): Promise<IAppointment> {
    const deletedAppointment = await Appointment.findOneAndDelete({_id: appointmentId});
    if (deletedAppointment) {
        AppLogger.info(`Got Delete Appointment(ID: ${deletedAppointment._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return deletedAppointment;
    } else {
        AppLogger.info(`Appointment(ID: ${appointmentId}) not found`);
        throw new ApplicationError(`Delete appointment: Appointment not found for ID: ${appointmentId} !`);
    }
}

