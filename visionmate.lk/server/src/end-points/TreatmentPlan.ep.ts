import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import * as TreatmentPlanDao from "../dao/TreatmentPlan.dao";
import { TreatmentPlanValidations } from "../middleware/validations/treatmentPlan-validations";
import { validationsChecker } from "../middleware/validations/validation-handler";
import { DTreatmentPlan } from "../models/TreatmentPlan.model";
import { IUser } from "../models/User.model";

// ================ VALIDATIONS ================
export function createTreatmentPlanValidationRules() {
    return [
        TreatmentPlanValidations.title(),
        TreatmentPlanValidations.description(),
    ];
}

export function updateTreatmentPlanValidationRules() {
    return [TreatmentPlanValidations.treatmentPlanId()];
}

export function fetchTreatmentPlanValidationRules() {
    return [TreatmentPlanValidations.treatmentPlanId()];
}

// ================ CREATE - C ================
export async function create(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        const user = req.user as IUser;
        const {title, description, startDate, endDate, diagnosis, referral, treatmentPlan} = req.body;
        const data: DTreatmentPlan = {
            title: title,
            description: description,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            diagnosis: "",
            referral: "",
            treatmentPlan: [],
        };
        await TreatmentPlanDao.createTreatmentPlan(data, user).then(treatmentPlan => {
            res.sendSuccess(treatmentPlan, "Treatment plan created successfully!");
        }).catch(next);
    }
}

// ================ READ - R ================
export async function getAll(req: Request, res: Response, next: NextFunction) {
    const user = req.user as IUser;
    await TreatmentPlanDao.getAllTreatmentPlans(user).then(treatmentPlans => {
        res.sendSuccess(treatmentPlans, "Get all treatment plans successfully!");
    }).catch(next);
}

export function getById(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        const user = req.user as IUser;
        const treatmentPlanId = req.params._id as unknown as Types.ObjectId;
        TreatmentPlanDao.getTreatmentPlanById(treatmentPlanId, user).then(treatmentPlan => {
            res.sendSuccess(treatmentPlan, "Get treatment plan by ID successfully!");
        }).catch(next);
    }
}

// ================ UPDATE - U ================
export async function update(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        const user = req.user as IUser;
        const {_id: treatmentPlanId, title, description, startDate, endDate} = req.body;
        const treatmentPlanDetails: Partial<DTreatmentPlan> = {
            title: title,
            description: description,
        };
        await TreatmentPlanDao.updateTreatmentPlan(treatmentPlanId, treatmentPlanDetails, user).then(treatmentPlan => {
            res.sendSuccess(treatmentPlan, "Treatment plan updated successfully!");
        }).catch(next);
    }
}

// ================ DELETE - D ================
export function deleteTreatmentPlan(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        const treatmentPlanId = req.params._id as unknown as Types.ObjectId;
        const user = req.user as IUser;
        TreatmentPlanDao.deleteTreatmentPlanById(treatmentPlanId, user).then(treatmentPlan => {
            res.sendSuccess(treatmentPlan, "Treatment plan deleted successfully!");
        }).catch(next);
    }
}
