import { Express } from 'express';
import * as AdminEp from "../end-points/Admin.ep";

export function AdminRoutesInit(app: Express) {
    /* PUBLIC ROUTES ===================================== */
    // app.post('/api/public/admin-sample', AdminEp.sample());

    /* AUTH ROUTES ===================================== */
    // app.get('/api/auth/admin-sample', AdminEp.sample());

}
