import { Express } from 'express';
import * as PatientEp from "../end-points/Patient.ep";

export function StaffscheduleRoutesInit(app: Express) {
    /* PUBLIC ROUTES ===================================== */
    // app.post('/api/public/patient-sample', PatientEp.sample());

    /* AUTH ROUTES ===================================== */
    // app.get('/api/auth/patient-sample', PatientEp.sample());

}