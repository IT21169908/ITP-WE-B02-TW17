import * as mongoose from "mongoose";
import {StringOrObjectId} from "../types/util-types";

interface CommonAttributes {
    schedule: string;
    surgeonId: StringOrObjectId;
    patientId: StringOrObjectId;
    scheduleDate: string;
    remark: string;
}

export interface DSchedule extends CommonAttributes {
    _id?: StringOrObjectId;
    status?: string;
}

export interface ISchedule extends CommonAttributes, mongoose.Document {
    status?: string;
}

