import { Express } from 'express';
import * as BlogEp from "../end-points/Blog.ep";

export function BlogRoutesInit(app: Express) {
    /* PUBLIC ROUTES ===================================== */

    /* AUTH ROUTES (Admin) ===================================== */
    app.post('/api/admin/blog/add', BlogEp.create);
}
