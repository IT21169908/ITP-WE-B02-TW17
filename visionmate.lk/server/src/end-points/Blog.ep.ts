import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import * as BlogDao from "../dao/Blog.dao";
import { validationsChecker } from "../middleware/validations/validation-handler";
import { BlogValidations } from "../middleware/validations/blog-validations";
import { DBlog } from "../models/Blog.model";
import { IUser } from "../models/User.model";


// ================ VALIDATIONS ================
export function createBlogValidationRules() {
    return [
        BlogValidations.title(),
        BlogValidations.description(),
    ];
}

export function updateBlogValidationRules() {
    return [BlogValidations.blogId()];
}

export function fetchBlogValidationRules() {
    return [BlogValidations.blogId()];
}

// ================ CREATE - C ================
export async function create(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        const user = req.user as IUser;
        const {title, titleDescription, description, tags, reference} = req.body;
        const data: DBlog = {
            title: title,
            titleDescription: titleDescription,
            description: description,
            tags: tags,
            reference: reference,
        };
        await BlogDao.createBlog(data, user).then(blog => {
            res.sendSuccess(blog, "Blog created successfully!");
        }).catch(next);
    }
}

// ================ READ - R ================
export async function getAll(req: Request, res: Response, next: NextFunction) {
    const user = req.user as IUser;
    await BlogDao.getAllBlogs(user).then(blogs => {
        res.sendSuccess(blogs, "Get all blogs successfully!");
    }).catch(next);
}

export function getById(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        const user = req.user as IUser;
        const blogId = req.params._id as unknown as Types.ObjectId;
        BlogDao.getBlogById(blogId, user).then(blog => {
            res.sendSuccess(blog, "Get blog by ID successfully!");
        }).catch(next);
    }
}

// ================ UPDATE - U ================
export async function update(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        const user = req.user as IUser;
        const {_id: blogId, title, titleDescription, description, tags, reference} = req.body;
        const blogDetails: Partial<DBlog> = {
            title: title,
            titleDescription: titleDescription,
            description: description,
            tags: tags,
            reference: reference,
        };
        await BlogDao.updateBlog(blogId, blogDetails, user).then(blog => {
            res.sendSuccess(blog, "Blog updated successfully!");
        }).catch(next);
    }
}

// ================ DELETE - D ================
export function deleteBlog(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        const blogId = req.params._id as unknown as Types.ObjectId;
        const user = req.user as IUser;
        BlogDao.deleteBlogById(blogId, user).then(blog => {
            res.sendSuccess(blog, "Blog updated successfully!");
        }).catch(next);
    }
}
