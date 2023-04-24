import * as mongoose from "mongoose";
import { Schema } from "mongoose";
import { IUpload } from "../models/Upload.model";
import env from "../utils/validate-env";

const path = require('path');

const UploadSchemaOptions: mongoose.SchemaOptions = {
    _id: true,
    id: false,
    timestamps: true,
    skipVersioning: {
        updatedAt: true
    },
    strict: false,
    toJSON: {
        getters: true,
        virtuals: true,
        transform: (doc: any, ret: any) => {
            delete ret.path;
            delete ret.isUrl;
            delete ret.user;
        }
    },
};

const UploadSchema = new mongoose.Schema({
    type: {
        type: Schema.Types.String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: false,
    },
    path: {
        type: Schema.Types.String,
        required: true,
    },
    name: {
        type: Schema.Types.String,
        required: false,
    },
    originalName: {
        type: Schema.Types.String,
        required: false,
    },
    extension: {
        type: Schema.Types.String,
        required: false,
    },
    isUrl: {
        type: Schema.Types.Boolean,
        required: true,
        default: false
    },
    notes: {
        type: Schema.Types.String,
        required: false,
    },
    fileSize: {
        type: Schema.Types.Number,
        required: false,
    },
}, UploadSchemaOptions);

UploadSchema.virtual('url').get(function () {
    // return this.isUrl ? this.path : path.join(process.env.API , process.env.FILE_ACCESS_URL , this._id.toString());
    return this.isUrl ? this.path : env.API + env.FILE_ACCESS_URL + '/' + this._id + '/' + this.originalName;
});

const Upload = mongoose.model<IUpload>('uploads', UploadSchema);
export default Upload;
