import * as mongoose from "mongoose";

interface CommonAttributes {
    title: string;
    tittledescription: string;
    description: string;
    tags: string;
    reference:string;
}


export interface IBlog extends CommonAttributes, mongoose.Document {
}