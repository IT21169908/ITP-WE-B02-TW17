import * as mongoose from "mongoose";
import {Schema} from "mongoose";
import {ISpectacle} from "../models/Spectacle.model";

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

export const SpectacleSchema = new mongoose.Schema({
    name: {
        type: Schema.Types.String,
        required: true,
    },
    frame_style: {
        type: Schema.Types.String,
        required: true,
    },
    frame_material: {
        type: Schema.Types.String,
        required: true,
    },
    lens_type: {
        type: Schema.Types.String,
        required: true,
    },
    lens_material: {
        type: Schema.Types.String,
        required: true,
    },
    lens_coating: {
        type: Schema.Types.String,
        required: false,
    },
    color: {
        type: Schema.Types.String,
        required: true,
    },
    size: {
        type: Schema.Types.String,
        required: true,
    },
    price: {
        type: Schema.Types.Number,
        required: true,
    },
}, schemaOptions);

const Spectacle = mongoose.model<ISpectacle>("spectacles", SpectacleSchema);

export default Spectacle;