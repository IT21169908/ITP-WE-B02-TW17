import * as mongoose from "mongoose";
import {Schema} from "mongoose";
import {ISchedule} from "../models/Schedule.model";

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

export const ScheduleSchema = new mongoose.Schema({
    schedule: {
        type: Schema.Types.String,
        required: true,
    },
    surgeonId: {
        type: Schema.Types.ObjectId,
        required: false,
    },
    patientId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    scheduleDate: {
        type: Schema.Types.Date,
    },
    remark: {
        type: Schema.Types.String,
        required: false,
    },
    status: {
        type: Schema.Types.String,
        required: true
    }
}, schemaOptions);

const Schedule = mongoose.model<ISchedule>("schedules", ScheduleSchema);

export default Schedule;
