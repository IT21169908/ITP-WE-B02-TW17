import * as mongoose from "mongoose";
import { Schema } from "mongoose";
import { Role } from "../enums/auth";
import { IDoctor } from "../models/Doctor.model";
import User, { UserSchemaOptions } from "./User.schema";

const DoctorSchema = new mongoose.Schema({
    about: {
        type: Schema.Types.String,
        required: false,
    },
    firstName: {
        type: Schema.Types.String,
        required: false,
    },
    lastName: {
        type: Schema.Types.String,
        required: false,
    },
    address: {
        type: Schema.Types.String,
        required: false,
    },
    city: {
        type: Schema.Types.String,
        required: false,
    },
    state: {
        type: Schema.Types.String,
        required: false,
    },
    country: {
        type: Schema.Types.String,
        required: false,
    },
    zipCode: {
        type: Schema.Types.String,
        required: false,
    },
    isActive: {
        type: Schema.Types.Boolean,
        required: false,
        default: true,
    },
    specialties: {
        type: [Schema.Types.String],
        required: false,
    },
    education: {
        type: [
            {
                school: {
                    type: Schema.Types.String,
                    required: true,
                },
                degree: {
                    type: Schema.Types.String,
                    required: true,
                },
                year: {
                    type: Schema.Types.Number,
                    required: true,
                },
            },
        ],
        required: false,
    },
    experience: {
        type: [
            {
                hospital: {
                    type: Schema.Types.String,
                    required: true,
                },
                department: {
                    type: Schema.Types.String,
                    required: true,
                },
                position: {
                    type: Schema.Types.String,
                    required: true,
                },
                startYear: {
                    type: Schema.Types.Number,
                    required: true,
                },
                endYear: {
                    type: Schema.Types.Number,
                    required: false,
                },
            },
        ],
        required: false,
    },
    languages: {
        type: [Schema.Types.String],
        required: false,
    },
    awards: {
        type: [Schema.Types.String],
        required: false,
    },
}, UserSchemaOptions);

export const Doctor = User.discriminator<IDoctor>('doctors', DoctorSchema, Role.DOCTOR);

export default Doctor;
