import { check } from "express-validator";
import { Role } from "../../enums/auth";
import { isObjectId } from "./blog-validations";

export const AuthValidations = {
    email: () => check('email').not().isEmpty().withMessage('Email is required!').isEmail().normalizeEmail({gmail_remove_dots: false}).withMessage('Invalid email address!'),
    phone: () => check('phone').isMobilePhone('si-LK').withMessage('Phone number is invalid or outside the LK'),
    website: () => check('website').optional(),
    company: () => check('company').isString().isLength({max: 1000}).withMessage('Company field should not be more than 1000 chars long!'),
    password: () => check('password').trim().isString().not().isEmpty()
        .withMessage('Password is required!')
        .isLength({min: 6, max: 40})
        .withMessage('Password must be at least 6 chars long & not more than 40 chars long!')
        .not().isIn(['123', 'password', 'god', 'abc']).withMessage('Do not use a common word as the password')
        .matches(/\d/).withMessage('Password must contain a number!'),
    passwordLogin: () => check('password').trim().isString().not().isEmpty().withMessage('Password is required!'),
    confirmPassword: () => check('confirmPassword').trim().isString().not().isEmpty()
        .withMessage('Confirm password is required!')
        .custom(async (confirmPassword, {req}) => {
            if (req.body.password !== confirmPassword) throw new Error('Passwords must be same!');
        }),
    role: (role: Role) => check('role').equals(role.toString()).withMessage('Unauthorized user role!'),
    name: () => check('name').isString().isLength({max: 1000}).withMessage('Name field should not be more than 1000 chars long!'),
    text: (key: string) => check(key).isString().isLength({max: 1000}),
    largeText: (key: string) => check(key).isString().isLength({max: 10000}),
    noPermissions: () => check('permissions').not().exists(),
    zip: () => check('zip').isPostalCode('US').withMessage('Invalid zip code!'),
    currency: (key: string = 'price') => check(key).not().isEmpty().isNumeric(),
    objectId: (key: string = "_id") => check(key).not().isEmpty().withMessage(`${key} cannot be empty`).custom((v) => isObjectId(v)).withMessage(`${key} is not a valid mongoDb objectID`),
    upload: (key: string = "upload") => check().not().isEmpty().withMessage(`${key} cannot be empty`).custom((v) => isObjectId(v)).withMessage(`${key} is invalid`),
    uploads: (key: string = "uploads") => check(`${key}.*._id`).not().isEmpty().withMessage(`${key} objects cannot be empty`).custom((v) => isObjectId(v)).withMessage(`${key} objects are invalid`),
};

