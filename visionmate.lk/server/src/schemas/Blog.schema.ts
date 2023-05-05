import * as mongoose from "mongoose";
import { Schema } from "mongoose";
import { IBlog } from "../models/Blog.model";

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

export const BlogSchema = new mongoose.Schema({
    title: {
        type: Schema.Types.String,
        required: true,
    },
    titleDescription: [
        {
            type: Schema.Types.String,
            required: false,
        }
    ],
    description: {
        type: Schema.Types.String,
        required: true,
    },
    tags: [
        {
            type: Schema.Types.String,
            default: [],
        }
    ],
    reference: {
        type: Schema.Types.String,
        required: false,
    },
    status: {
        type: Schema.Types.String,
        required: false,
    },
    publishedDate: {
        type: Schema.Types.Date,
        required: false,
    }
}, schemaOptions);

const Blog = mongoose.model<IBlog>("blogs", BlogSchema);

export default Blog;
