import * as mongoose from "mongoose";
import { StringOrObjectId } from "../types/util-types";

interface CommonAttributes {
    title: string;
    description: string;
    tags: string[];
    reference: string;
    notes?: string;
}

export interface DAppointment extends CommonAttributes {
    _id?: StringOrObjectId;
    status?: string;
    patientId?: StringOrObjectId;
    doctorId?: StringOrObjectId;
    appointmentDate?: Date;
    duration: number;
    invoiceId?: StringOrObjectId;
}

export interface IAppointment extends CommonAttributes, mongoose.Document {
    status?: string;
    patientId?: StringOrObjectId;
    doctorId?: StringOrObjectId;
    appointmentDate?: Date;
    duration: number;
    invoiceId?: StringOrObjectId;
}
