import {Express} from 'express';
import * as SpectacleEp from "../end-points/Spectacle.ep";

export function SpectacleRoutesInit(app: Express) {
    /* PUBLIC ROUTES ===================================== */


    /* AUTH ROUTES (Admin) ===================================== */
    app.get('/api/admin/spectacles', SpectacleEp.getAll);
    app.get('/api/admin/spectacles/:_id', SpectacleEp.fetchSpectacleValidationRules(), SpectacleEp.show);

    app.post('/api/admin/spectacles', SpectacleEp.createSpectacleValidationRules(), SpectacleEp.create);
    app.put('/api/admin/spectacles/:_id', SpectacleEp.updateSpectacleValidationRules(), SpectacleEp.update);
    app.delete('/api/admin/spectacles/:_id', SpectacleEp.fetchSpectacleValidationRules(), SpectacleEp.destroy);
}
