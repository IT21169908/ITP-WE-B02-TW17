import {check} from "express-validator";
import mongoose from "mongoose";

export const OrderValidations = {
    userId: () =>
        check("userId")
            .not()
            .isEmpty()
            .withMessage("User ID is required!")
            .custom((v) => mongoose.isValidObjectId(v))
            .withMessage(`userId is not a valid mongoDb objectID`),
    status: () =>
        check("status")
            .trim()
            .isString()
            .not()
            .isIn(["pending"])
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
    totalAmount: () =>
        check("totalAmount")
            .trim()
            .isNumeric()
            .not()
            .isEmpty()
            .withMessage("Total amount is required!")
            .toFloat(),
    shippingFee: () =>
        check("shippingFee")
            .trim()
            .isNumeric()
            .not()
            .isEmpty()
            .withMessage("Shipping fee is required!")
            .toFloat(),
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
            .withMessage(`${key} is not a valid mongoDb objectID`),
};
