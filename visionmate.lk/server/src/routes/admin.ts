import {Express} from 'express';
import * as UserEp from "../end-points/User.ep";

export function AdminRoutesInit(app: Express) {
    app.get('/api/admin/users', UserEp.getAll);
    app.get('/api/admin/users/:_id', UserEp.fetchUserValidationRules(), UserEp.show);
    app.put('/api/admin/users/:_id', UserEp.updateUserValidationRules(), UserEp.update);
    app.delete('/api/admin/users/:_id', UserEp.fetchUserValidationRules(), UserEp.destroy);
    /* PUBLIC ROUTES ===================================== */
    // app.post('/api/public/admin-sample', AdminEp.sample());

    /* AUTH ROUTES ===================================== */
    // app.get('/api/auth/admin-sample', AdminEp.sample());

}
