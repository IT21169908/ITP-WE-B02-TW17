import * as mongoose from "mongoose";
import { Schema } from "mongoose";
import { Role } from "../enums/auth";
import { ISurgeon } from "../models/Surgeon.model";
import User, { UserSchemaOptions } from "./User.schema";

export const SurgeonSchema = new mongoose.Schema({
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
    surgeriesPerformed: {
        type: Schema.Types.Number,
        required: false,
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
    status: {
        type: Schema.Types.String,
        required: false,
    },
}, UserSchemaOptions);

export const Surgeon = User.discriminator<ISurgeon>('surgeons', SurgeonSchema, Role.SURGEON);

export default Surgeon;
