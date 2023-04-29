import * as mongoose from "mongoose";
import { Schema } from "mongoose";
import { IAppointment } from "../models/Appointment.model";

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

export const AppointmentSchema = new mongoose.Schema({
    title: {
        type: Schema.Types.String,
        required: true,
    },
    description: {
        type: Schema.Types.String,
        required: true,
    },
    tags: [
        {
            type: Schema.Types.String,
            default: [],
        }
    ],
    reference: {
        type: Schema.Types.String,
        required: true,
    },
    notes: {
        type: Schema.Types.String,
        required: false,
    },
    status: {
        type: Schema.Types.String,
        required: false,
    },
    patientId: {
        type: Schema.Types.ObjectId,
        required: false, // TODO: Change to True
    },
    doctorId: {
        type: Schema.Types.ObjectId,
        required: false, // TODO: Change to True
    },
    appointmentDate: {
        type: Schema.Types.Date,
        required: true,
    },
    duration: {
        type: Schema.Types.Number,
        required: true,
    },
    invoiceId: {
        type: Schema.Types.ObjectId,
        required: false, // TODO: Change to True
    }
}, schemaOptions);

const Appointment = mongoose.model<IAppointment>("appointments", AppointmentSchema);

export default Appointment;
