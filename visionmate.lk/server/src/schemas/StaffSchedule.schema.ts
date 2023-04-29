import * as mongoose from "mongoose";
import {Schema} from "mongoose";
import { IStaffSchedule } from "../models/StaffSchedule.model";
import { UserSchemaOptions } from "./User.schema";

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

const StaffSchedule = mongoose.model<IStaffSchedule>("staff_schedules", StaffScheduleSchema);

export default StaffSchedule;
