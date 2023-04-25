import * as mongoose from "mongoose";
import {Schema} from "mongoose";
export const BlogSchema = new mongoose.Schema({
    title: {
        type: Schema.Types.String,
        required: false,
    },
    tittledescription: [{
        type: Schema.Types.String,
        default: [],
    }],
    description: {
        type: Schema.Types.String,
        required: false,
    },
    tags: [{
        type: Schema.Types.String,
        default: [],
    }],
    reference: {
        type: Schema.Types.String,
        required: false,
    }
});


const Blog = mongoose.model("BlogsPosts",BlogSchema);
module.exports = Blog;
