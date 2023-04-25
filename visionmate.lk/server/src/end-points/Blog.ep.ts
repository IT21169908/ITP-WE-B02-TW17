import {NextFunction, Request, Response} from "express";
import * as BlogDao from "../dao/Blog.dao";
import { DBlog } from "../models/Blog.model";
import { IUser } from "../models/User.model";

export async function create(req: Request, res: Response, next: NextFunction) {
    const user = req.user as IUser;
    const { title, titleDescription, description, tags, reference} = req.body;
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


