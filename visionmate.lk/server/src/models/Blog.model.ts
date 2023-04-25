import * as mongoose from "mongoose";
import { StringOrObjectId } from "../types/util-types";

interface CommonAttributes {
    title: string;
    titleDescription: string;
    description: string;
    tags: string;
    reference:string;
}

export interface DBlog extends CommonAttributes {
    _id?: StringOrObjectId;
    status?: string;
    publishedDate?: Date;
}

export interface IBlog extends CommonAttributes, mongoose.Document {
    status?: string;
    publishedDate?: Date;
}

