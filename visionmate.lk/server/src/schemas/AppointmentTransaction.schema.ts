import * as mongoose from "mongoose";
import { Schema } from "mongoose";
import { IAppointmentTransaction } from "../models/AppointmentTransaction.model";

const schemaOptions: mongoose.SchemaOptions = {
    _id: true,
    id: false,
    timestamps: true,
    skipVersioning: {
        updatedAt: true
    },
    strict: true,
    toJSON: {
        getters: true,
        virtuals: true,
    },
};

const AppointmentTransactionSchema = new mongoose.Schema({
    appointmentId: {
        type: Schema.Types.String,
        required: true,
    },
    type: {
        type: [Schema.Types.String],
        required: true,
    },
    amount: {
        type: Schema.Types.Number,
        required: true,
    },
    currency: {
        type: Schema.Types.String,
        required: false,
    },
    paymentMethod: {
        type: Schema.Types.String,
        required: false,
    },
    notes: {
        type: Schema.Types.String,
        required: false,
    },
    transactionType: {
        type: Schema.Types.String,
        required: false,
    },
    transactionDate: {
        type: Schema.Types.Date,
        required: true,
    },
    transactionStatus: {
        type: Schema.Types.String,
        required: true,
    },
    accountId: {
        type: Schema.Types.String,
        required: false,
    }
}, schemaOptions);

const AppointmentTransaction = mongoose.model<IAppointmentTransaction>("appointment_transactions", AppointmentTransactionSchema);

export default AppointmentTransaction;
