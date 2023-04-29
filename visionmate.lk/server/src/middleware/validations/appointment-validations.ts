import { check } from "express-validator";
import mongoose from "mongoose";

export const AppointmentValidations = {
    title: () => check('title')
        .trim()
        .isString()
        .not()
        .isEmpty()
        .withMessage('Title is required!'),
    description: () => check('description')
        .trim()
        .isString()
        .not()
        .isEmpty()
        .withMessage('Description is required!'),
    appointmentId: (key: string = "_id") => check(key)
        .not()
        .isEmpty()
        .withMessage(`${key} cannot be empty`)
        .custom((v) => mongoose.isValidObjectId(v))
        .withMessage(`${key} is not a valid mongoDb objectID`),
};
