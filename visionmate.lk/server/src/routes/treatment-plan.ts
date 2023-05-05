import { Express } from 'express';
import * as TreatmentPlanEp from "../end-points/TreatmentPlan.ep";

export function TreatmentPlanRoutesInit(app: Express) {
    /* PUBLIC ROUTES ===================================== */
    app.get('/api/auth/treatment-plan/getById/:_id', TreatmentPlanEp.fetchTreatmentPlanValidationRules(), TreatmentPlanEp.getById);

    /* AUTH ROUTES (Doctor) ===================================== */
    app.get('/api/doctor/treatment-plan/get-all', TreatmentPlanEp.getAll);

    app.post('/api/doctor/treatment-plan/add', TreatmentPlanEp.createTreatmentPlanValidationRules(), TreatmentPlanEp.create);
    app.put('/api/doctor/treatment-plan/update', TreatmentPlanEp.updateTreatmentPlanValidationRules(), TreatmentPlanEp.update);
    app.delete('/api/doctor/treatment-plan/delete/:_id', TreatmentPlanEp.fetchTreatmentPlanValidationRules(), TreatmentPlanEp.deleteTreatmentPlan);
}
