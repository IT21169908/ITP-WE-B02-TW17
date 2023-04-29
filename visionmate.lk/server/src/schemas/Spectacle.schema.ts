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
    frameStyle: {
        type: Schema.Types.String,
        required: true,
    },
    frameMaterial: {
        type: Schema.Types.String,
        required: true,
    },
    lensType: {
        type: Schema.Types.String,
        required: true,
    },
    lensMaterial: {
        type: Schema.Types.String,
        required: true,
    },
    lensCoating: {
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