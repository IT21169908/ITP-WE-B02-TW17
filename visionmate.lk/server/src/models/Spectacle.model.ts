import * as mongoose from "mongoose";
import {StringOrObjectId} from "../types/util-types";

interface CommonAttributes {
    name: string;
    frame_style: string;
    frame_material: string;
    lens_type: string;
    lens_material: string;
    lens_coating: string;
    color: string;
    size: string;
    price: number;
}

export interface DSpectacle extends CommonAttributes {
    _id?: StringOrObjectId;
}

export interface ISpectacle extends CommonAttributes, mongoose.Document {

}