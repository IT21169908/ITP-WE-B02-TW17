import {NextFunction, Request, Response} from "express";
import * as BlogDao from "../dao/Blog.dao";
import { IBlog } from "../models/Blog.model";

export async function create(req: Request, res: Response, next: NextFunction) {
    const { title, tittleDescription, description, tags, reference} = req.body;
    const data: IBlog = {
        title: title,
        tittleDescription: tittleDescription,
        description: description,
        tags: tags,
        reference: reference,
    };
    BlogDao.createBlog().then(async token => {
        res.sendSuccess(token);
    }).catch(next);
}
export function sample(): import("express-serve-static-core").RequestHandler<{}, any, any, import("qs").ParsedQs, Record<string, any>> {
    throw new Error('Function not implemented.');
}

