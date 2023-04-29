import * as mongoose from "mongoose";
import { StringOrObjectId } from "../types/util-types";

interface CommonAttributes {
    appointmentId: StringOrObjectId;
    type: string[];
    amount: number;
    currency?: string;
    paymentMethod?: string;
    notes?: string;
}

export interface DAppointmentTransaction extends CommonAttributes {
    _id?: StringOrObjectId;
    transactionType?: string;
    transactionDate?: Date;
    transactionStatus?: string;
    accountId?: StringOrObjectId;
}

export interface IAppointmentTransaction extends CommonAttributes, mongoose.Document {
    transactionType?: string;
    transactionDate?: Date;
    transactionStatus?: string;
    accountId?: StringOrObjectId;
}
