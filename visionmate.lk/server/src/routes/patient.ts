import {Express} from 'express';
import * as PatientEp from "../end-points/Patient.ep";
import * as SpectacleEp from "../end-points/Spectacle.ep";

export function PatientRoutesInit(app: Express) {
    /* PUBLIC ROUTES ===================================== */
    // app.post('/api/public/patient-sample', PatientEp.sample());

    /* AUTH ROUTES ===================================== */
    // app.get('/api/auth/patient-sample', PatientEp.sample());
    app.get('/api/patient/spectacles', SpectacleEp.getAll);
    app.get('/api/patient/spectacles/:_id', SpectacleEp.fetchSpectacleValidationRules(), SpectacleEp.show);
}
