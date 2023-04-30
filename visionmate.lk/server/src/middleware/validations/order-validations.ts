import {check} from "express-validator";
import mongoose from "mongoose";

export const OrderValidations = {
    spectacleId: () =>
        check("spectacleId")
            .not()
            .isEmpty()
            .withMessage("Spectacle ID is required!")
            .custom((v) => mongoose.isValidObjectId(v))
            .withMessage(`spectacleId is not a valid mongodbDb objectID`),
    status: () =>
        check("status")
            .not()
            .isEmpty()
            .withMessage("status is required!")
            .trim()
            .isString()
            .isIn(["pending", "processing", "shipped", "delivered"])
            .withMessage("Invalid status!"),
    address: () =>
        check("address")
            .trim()
            .isString()
            .not()
            .isEmpty()
            .withMessage("Address is required!"),
    phone: () =>
        check("phone")
            .trim()
            .isString()
            .not()
            .isEmpty()
            .withMessage("Phone number is required!"),
    email: () =>
        check("email")
            .trim()
            .isString()
            .not()
            .isEmpty()
            .withMessage("Email is required!")
            .isEmail()
            .withMessage("Invalid email address!"),
    paymentMethod: () =>
        check("paymentMethod")
            .trim()
            .isString()
            .not()
            .isEmpty()
            .withMessage("Payment method is required!")
            .isIn(["cod", "online"])
            .withMessage("Invalid payment method!"),
    note: () =>
        check("note")
            .optional({nullable: true})
            .trim()
            .isString(),
    orderId: (key = "_id") =>
        check(key)
            .not()
            .isEmpty()
            .withMessage(`${key} cannot be empty`)
            .custom((v) => mongoose.isValidObjectId(v))
            .withMessage(`${key} is not a valid mongodbDb objectID`),
};
