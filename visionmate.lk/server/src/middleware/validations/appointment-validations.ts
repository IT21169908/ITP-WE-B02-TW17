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
    appointmentIdOnTransaction: (key: string = "appointmentId") => check(key)
        .not()
        .isEmpty()
        .withMessage(`${key} cannot be empty`)
        .custom((v) => mongoose.isValidObjectId(v))
        .withMessage(`${key} is not a valid mongoDb objectID`),
    appointmentTransactionId: (key: string = "_id") => check(key)
        .not()
        .isEmpty()
        .withMessage(`${key} cannot be empty`)
        .custom((v) => mongoose.isValidObjectId(v))
        .withMessage(`${key} is not a valid mongoDb objectID`),
    type: () => check('type')
        .trim()
        .isString()
        .not()
        .isEmpty()
        .withMessage('Type is required!'),
    amount: () => check('amount')
        .trim()
        .isNumeric()
        .not()
        .isEmpty()
        .withMessage('Amount is required!'),
    transactionStatus: () => check('transactionStatus')
        .trim()
        .isString()
        .not()
        .isEmpty()
        .withMessage('Transaction Status is required!'),
};
