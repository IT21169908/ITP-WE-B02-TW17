import {Express} from 'express';
import * as OrderEp from "../end-points/Order.ep";

export function OrderRoutesInit(app: Express) {
    /* PUBLIC ROUTES ===================================== */


    /* AUTH ROUTES (Admin) ===================================== */
    app.get('/api/patient/orders', OrderEp.getByUser);
    app.post('/api/patient/orders/place', OrderEp.createOrderValidationRules(), OrderEp.create);

    app.get('/api/admin/orders', OrderEp.getAll);
    app.get('/api/admin/orders/:_id', OrderEp.fetchOrderValidationRules(), OrderEp.show);

    app.put('/api/admin/orders/:_id', OrderEp.updateOrderValidationRules(), OrderEp.update);
    app.delete('/api/admin/orders/:_id', OrderEp.fetchOrderValidationRules(), OrderEp.destroy);

}
