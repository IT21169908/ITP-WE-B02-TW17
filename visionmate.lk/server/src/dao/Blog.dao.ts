import { Types } from "mongoose";
import { DBlog, IBlog } from "../models/Blog.model";
import { IUser } from "../models/User.model";
import Blog from "../schemas/Blog.schema";
import { ApplicationError } from "../utils/application-error";
import { AppLogger } from "../utils/logging";
import { getRoleTitle } from "../utils/utils";

export async function createBlog(data: DBlog, user?: IUser): Promise<IBlog> {
    try {
        const iBlogs = new Blog(data);
        const blog = await iBlogs.save();
        AppLogger.info(`Create Blog(ID: ${blog._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return blog;
    } catch (error: unknown) {
        if (error instanceof Error) {
            AppLogger.error(`Creating Blog: ${error.message}`);
            throw new ApplicationError(`Creating blog: ${error.message}`);
        }
        throw error;
    }
}

export async function getAllBlogs(user?: IUser): Promise<IBlog[]> {
    const blogs = await Blog.find();
    if (blogs) {
        AppLogger.info(`Got All Blogs - Count: ${blogs.length} by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return blogs;
    } else {
        AppLogger.info(`Blogs Not Found`);
        throw new ApplicationError(`Get all blogs: Blogs not found!`);
    }
}

export async function getBlogById(blogId: Types.ObjectId, user?: IUser): Promise<IBlog> {
    const blog = await Blog.findById(blogId);
    if (blog) {
        AppLogger.info(`Got Blog(ID: ${blog._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return blog;
    } else {
        AppLogger.info(`Blog(ID: ${blogId}) Not Found`);
        throw new ApplicationError(`Get Blog: Blog not found for ID: ${blogId} !`);
    }
}

export async function updateBlog(blogId: Types.ObjectId, blogDetails: Partial<DBlog>, user?: IUser): Promise<IBlog> {
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, blogDetails as any, {new: true});
    if (updatedBlog) {
        AppLogger.info(`Update Blog(ID: ${updatedBlog._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return updatedBlog;
    } else {
        AppLogger.info(`Blog(ID: ${blogId}) Not Found`);
        throw new ApplicationError(`Update blog: Blog not found for ID: ${blogId} !`);
    }
}

export async function deleteBlogById(blogId: Types.ObjectId, user?: IUser): Promise<IBlog> {
    const deletedBlog = await Blog.findOneAndDelete({_id: blogId});
    if (deletedBlog) {
        AppLogger.info(`Got Delete Blog(ID: ${deletedBlog._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return deletedBlog;
    } else {
        AppLogger.info(`Blog(ID: ${blogId}) not found`);
        throw new ApplicationError(`Delete blog: Blog not found for ID: ${blogId} !`);
    }
}
