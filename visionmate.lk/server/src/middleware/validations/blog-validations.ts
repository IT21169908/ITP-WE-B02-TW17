import { check } from "express-validator";
import { Types } from "mongoose";
import { Role } from "../../enums/auth";

export function isObjectId(v: string): boolean {
    return Types.ObjectId.isValid(v) && new Types.ObjectId(v).toHexString() === v;
}

export const BlogValidations = {
    title: () => check('title').trim().isString().not().isEmpty().withMessage('Title is required!'),
    description: () => check('description').trim().isString().not().isEmpty().withMessage('Description is required!'),
    blogId: (key: string = "_id") => check(key).not().isEmpty().withMessage(`${key} cannot be empty`).custom((v) => isObjectId(v)).withMessage(`${key} is not a valid mongoDb objectID`),
};
