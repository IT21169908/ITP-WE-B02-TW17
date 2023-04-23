import * as mongoose from "mongoose";
import {Schema} from "mongoose";
import { Role } from "../enums/auth";
import { IPatient } from "../models/Patient.model";
import User, { UserSchemaOptions } from "./User.schema";

export const PatientSchema = new mongoose.Schema({
    about: {
        type: Schema.Types.String,
        required: false,
    },
    socialLinks: [{
        type: Schema.Types.String,
        default: [],
    }],
}, UserSchemaOptions);

export const Patient = User.discriminator<IPatient>('patients', PatientSchema, Role.PATIENT);

export default Patient;
