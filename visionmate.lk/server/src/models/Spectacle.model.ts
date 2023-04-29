import * as mongoose from "mongoose";
import {StringOrObjectId} from "../types/util-types";

interface CommonAttributes {
    name: string;
    frameStyle: string;
    frameMaterial: string;
    lensType: string;
    lensMaterial: string;
    lensCoating: string;
    color: string;
    size: string;
    price: number;
}

export interface DSpectacle extends CommonAttributes {
    _id?: StringOrObjectId;
}

export interface ISpectacle extends CommonAttributes, mongoose.Document {

}