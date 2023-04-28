import * as mongoose from "mongoose";
import {Schema} from "mongoose";
import { Role } from "../enums/auth";
import { IStaffScheduleSchema } from "../models/Staffschedule.model";
import User, { UserSchemaOptions } from "./User.schema";

export const StaffScheduleSchema = new mongoose.Schema({
    SID: {
        type: Schema.Types.String,
        required: false,
    },
    Schedule: [{
        type: Schema.Types.String,
        default: [],
    }],
    Patient: {
        type: Schema.Types.String,
        required: false,
    },
    Time: {
        type: Schema.Types.String,
        required: false,
    }
}, UserSchemaOptions);

export const StaffScheduleSchema = User.discriminator<IStaffScheduleSchema>('staffschrdule', StaffScheduleSchema, Role.STAFFSCHEDULE);

export default StaffScheduleSchema;