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
    frame_style: () =>
        check("frame_style")
            .trim()
            .isString()
            .not()
            .isEmpty()
            .withMessage("Frame style is required!"),
    frame_material: () =>
        check("frame_material")
            .trim()
            .isString()
            .not()
            .isEmpty()
            .withMessage("Frame material is required!"),
    lens_type: () =>
        check("lens_type")
            .trim()
            .isString()
            .not()
            .isEmpty()
            .withMessage("Lens type is required!"),
    lens_material: () =>
        check("lens_material")
            .trim()
            .isString()
            .not()
            .isEmpty()
            .withMessage("Lens material is required!"),
    lens_coating: () =>
        check("lens_coating")
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

