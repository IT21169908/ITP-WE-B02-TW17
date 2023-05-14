import {check} from "express-validator";
import mongoose from "mongoose";
import {Role} from "../../enums/auth";


export const UserValidations = {
    email: () => check('email')
        .not()
        .isEmpty()
        .withMessage('Email is required!')
        .isEmail()
        .normalizeEmail({gmail_remove_dots: false})
        .withMessage('Invalid email address!'),
    phone: () => check('phone')
        .isMobilePhone('si-LK')
        .withMessage('Phone number is invalid or outside the LK'),
    role: (roles: Role[]) => check('role')
        .isIn(roles)
        .withMessage('Unauthorized user role!'),
    name: () => check('name')
        .isString()
        .isLength({max: 1000})
        .withMessage('Name field should not be more than 1000 chars long!'),
    userId: (key = "_id") =>
        check(key)
            .not()
            .isEmpty()
            .withMessage(`${key} cannot be empty`)
            .custom((v) => mongoose.isValidObjectId(v))
            .withMessage(`${key} is not a valid mongoDb objectID`),
};

