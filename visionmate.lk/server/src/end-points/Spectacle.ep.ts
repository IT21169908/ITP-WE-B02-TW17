import {NextFunction, Request, Response} from "express";
import {Types} from "mongoose";
import * as Spectacle from "../dao/Spectacle.dao";
import {validationsChecker} from "../middleware/validations/validation-handler";
import {SpectacleValidations} from "../middleware/validations/spectacle-validations";
import {DSpectacle} from "../models/Spectacle.model";
import {IUser} from "../models/User.model";


// ================ VALIDATIONS ================
export function createSpectacleValidationRules() {
    return [
        SpectacleValidations.name(),
        SpectacleValidations.frame_style(),
        SpectacleValidations.frame_material(),
        SpectacleValidations.lens_type(),
        SpectacleValidations.lens_material(),
        SpectacleValidations.lens_coating(),
        SpectacleValidations.color(),
        SpectacleValidations.size(),
        SpectacleValidations.price(),
    ];
}

export function updateSpectacleValidationRules() {
    return [SpectacleValidations.spectacleId()];
}

export function fetchSpectacleValidationRules() {
    return [SpectacleValidations.spectacleId()];
}

// ================ CREATE - C ================
export async function create(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        const user = req.user as IUser;

        const data: DSpectacle = {
            name: req.body.name,
            frame_style: req.body.frame_style,
            frame_material: req.body.frame_material,
            lens_type: req.body.lens_type,
            lens_material: req.body.lens_material,
            lens_coating: req.body.lens_coating,
            color: req.body.color,
            size: req.body.size,
            price: req.body.price,
        };
        await Spectacle.store(data, user).then(spectacle => {
            res.sendSuccess(spectacle, "Spectacle created successfully!");
        }).catch(next);
    }
}

// ================ READ - R ================
export async function getAll(req: Request, res: Response, next: NextFunction) {
    const user = req.user as IUser;
    await Spectacle.getAll(user).then(spectacle => {
        res.sendSuccess(spectacle, "Get all spectacle successfully!");
    }).catch(next);
}

export function show(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        const user = req.user as IUser;
        const spectacleId = req.params._id as unknown as Types.ObjectId;
        Spectacle.find(spectacleId, user).then(spectacle => {
            res.sendSuccess(spectacle, "Get spectacle by ID successfully!");
        }).catch(next);
    }
}

// ================ UPDATE - U ================
export async function update(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        const user = req.user as IUser;
        const spectacle_id = req.params._id as unknown as Types.ObjectId;
        const data: Partial<DSpectacle> = {
            name: req.body.name,
            frame_style: req.body.frame_style,
            frame_material: req.body.frame_material,
            lens_type: req.body.lens_type,
            lens_material: req.body.lens_material,
            lens_coating: req.body.lens_coating,
            color: req.body.color,
            size: req.body.size,
            price: req.body.price,
        };
        await Spectacle.update(spectacle_id, data, user).then(spectacle => {
            res.sendSuccess(spectacle, "Spectacle updated successfully!");
        }).catch(next);
    }
}

// ================ DELETE - D ================
export function destroy(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        const spectacle_id = req.params._id as unknown as Types.ObjectId;
        const user = req.user as IUser;
        Spectacle.destroy(spectacle_id, user).then(spectacle => {
            res.sendSuccess(spectacle, "Spectacle updated successfully!");
        }).catch(next);
    }
}
