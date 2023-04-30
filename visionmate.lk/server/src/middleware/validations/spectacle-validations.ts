import {check} from "express-validator";
import mongoose from "mongoose";


export const SpectacleValidations = {
    name: () =>
        check("name")
            .trim()
            .isString()
            .not()
            .isEmpty()
            .withMessage("Name is required!"),
    frameStyle: () =>
        check("frameStyle")
            .trim()
            .isString()
            .not()
            .isEmpty()
            .withMessage("Frame style is required!"),
    frameMaterial: () =>
        check("frameMaterial")
            .trim()
            .isString()
            .not()
            .isEmpty()
            .withMessage("Frame material is required!"),
    lensType: () =>
        check("lensType")
            .trim()
            .isString()
            .not()
            .isEmpty()
            .withMessage("Lens type is required!"),
    lensMaterial: () =>
        check("lensMaterial")
            .trim()
            .isString()
            .not()
            .isEmpty()
            .withMessage("Lens material is required!"),
    lensCoating: () =>
        check("lensCoating")
            .trim()
            .isString()
            .not()
            .isEmpty()
            .withMessage("Lens coating is required!"),
    color: () =>
        check("color")
            .trim()
            .isString()
            .not()
            .isEmpty()
            .withMessage("Color is required!"),
    size: () =>
        check("size")
            .trim()
            .isString()
            .not()
            .isEmpty()
            .withMessage("Size is required!"),
    price: () =>
        check("price")
            .trim()
            .isNumeric()
            .not()
            .isEmpty()
            .withMessage("Price is required!")
            .toFloat(),
    spectacleId: (key = "_id") =>
        check(key)
            .not()
            .isEmpty()
            .withMessage(`${key} cannot be empty`)
            .custom((v) => mongoose.isValidObjectId(v))
            .withMessage(`${key} is not a valid mongoDb objectID`),
};

