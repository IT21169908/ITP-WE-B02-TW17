import * as mongoose from "mongoose";
import {Types} from "mongoose";

export interface DUpload {
    user?: Types.ObjectId;
    type: string;
    path: string;
    originalName?: string;
    name?: string;
    extension?: string;
    isUrl?: boolean;
    notes?: string;
    fileSize?: number;
}

export interface IUpload extends DUpload, mongoose.Document {
    url: string;
    path: string;
}
