import { Request, Response } from "express";
import { validationResult } from "express-validator";

export function validationsChecker(req: Request, res: Response): void|boolean {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.sendError(errors.array()[0]['msg'], 422);
    }
    return true;
}
