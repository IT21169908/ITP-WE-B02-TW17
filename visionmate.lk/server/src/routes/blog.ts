import { Express } from 'express';
import * as BlogEp from "../end-points/Blog.ep";

export function BlogRoutesInit(app: Express) {
    /* PUBLIC ROUTES ===================================== */
    app.get('/api/public/blog/get-all', BlogEp.getAll);
    app.get('/api/public/blog/getById/:_id', BlogEp.fetchBlogValidationRules(), BlogEp.getById);

    /* AUTH ROUTES (Admin) ===================================== */
    app.post('/api/admin/blog/add', BlogEp.createBlogValidationRules(), BlogEp.create);
    app.put('/api/admin/blog/update', BlogEp.updateBlogValidationRules(), BlogEp.update);
    app.delete('/api/admin/blog/delete/:_id', BlogEp.fetchBlogValidationRules(), BlogEp.deleteBlog);
}
