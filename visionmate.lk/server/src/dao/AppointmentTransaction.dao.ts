import { Types } from "mongoose";
import { DAppointmentTransaction, IAppointmentTransaction } from "../models/AppointmentTransaction.model";
import { IUser } from "../models/User.model";
import AppointmentTransaction from "../schemas/AppointmentTransaction.schema";
import { ApplicationError } from "../utils/application-error";
import { AppLogger } from "../utils/logging";
import { getRoleTitle } from "../utils/utils";

export async function createAppointmentTransaction(data: DAppointmentTransaction, user?: IUser): Promise<IAppointmentTransaction> {
    try {
        const iAppointmentTransactions = new AppointmentTransaction(data);
        const appointmentTransaction = await iAppointmentTransactions.save();
        AppLogger.info(`Create Appointment Transaction(ID: ${appointmentTransaction._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return appointmentTransaction;
    } catch (error: unknown) {
        if (error instanceof Error) {
            AppLogger.error(`Creating Appointment Transaction: ${error.message}`);
            throw new ApplicationError(`Creating appointment transaction: ${error.message}`);
        }
        throw error;
    }
}

export async function getAllAppointmentTransactions(user?: IUser): Promise<IAppointmentTransaction[]> {
    const appointmentTransactions = await AppointmentTransaction.find();
    if (appointmentTransactions) {
        AppLogger.info(`Got All Appointment Transactions - Count: ${appointmentTransactions.length} by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return appointmentTransactions;
    } else {
        AppLogger.info(`Appointment Transactions Not Found`);
        throw new ApplicationError(`Get all appointment transactions: Appointment transactions not found!`);
    }
}

export async function getAppointmentTransactionById(appointmentTransactionId: Types.ObjectId, user?: IUser): Promise<IAppointmentTransaction> {
    const appointmentTransaction = await AppointmentTransaction.findById(appointmentTransactionId);
    if (appointmentTransaction) {
        AppLogger.info(`Got Appointment Transaction(ID: ${appointmentTransaction._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return appointmentTransaction;
    } else {
        AppLogger.info(`Appointment Transaction(ID: ${appointmentTransactionId}) Not Found`);
        throw new ApplicationError(`Get Appointment Transaction: Appointment transaction not found for ID: ${appointmentTransactionId} !`);
    }
}

export async function updateAppointmentTransaction(appointmentTransactionId: Types.ObjectId, appointmentTransactionDetails: Partial<DAppointmentTransaction>, user?: IUser): Promise<IAppointmentTransaction> {
    const updatedAppointmentTransaction = await AppointmentTransaction.findByIdAndUpdate(appointmentTransactionId, appointmentTransactionDetails as any, {new: true});
    if (updatedAppointmentTransaction) {
        AppLogger.info(`Update Appointment Transaction(ID: ${updatedAppointmentTransaction._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return updatedAppointmentTransaction;
    } else {
        AppLogger.info(`Appointment Transaction(ID: ${appointmentTransactionId}) Not Found`);
        throw new ApplicationError(`Update appointment transaction: Appointment transaction not found for ID: ${appointmentTransactionId} !`);
    }
}

export async function deleteAppointmentTransactionById(appointmentTransactionId: Types.ObjectId, user?: IUser): Promise<IAppointmentTransaction> {
    const deletedAppointmentTransaction = await AppointmentTransaction.findOneAndDelete({_id: appointmentTransactionId});
    if (deletedAppointmentTransaction) {
        AppLogger.info(`Got Delete Appointment Transaction(ID: ${deletedAppointmentTransaction._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return deletedAppointmentTransaction;
    } else {
        AppLogger.info(`Appointment Transaction(ID: ${appointmentTransactionId}) not found`);
        throw new ApplicationError(`Delete appointment transaction: Appointment transaction not found for ID: ${appointmentTransactionId} !`);
    }
}

