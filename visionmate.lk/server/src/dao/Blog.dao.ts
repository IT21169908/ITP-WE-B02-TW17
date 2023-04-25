import {Blog, IBlog} from "../models/Blog.model";

import Blog from "../schemas/Blog.schema";
import { AppLogger } from "../utils/logging";

export async function createBlog(data: IBlog): Promise<IBlog> {
    const iBlogs = new Blog(data);
    const blog = await iBlogs.save();
    AppLogger.info(`Createb blog by user Id: `);
    // TODO fire event to send emails
    return blog;
}
