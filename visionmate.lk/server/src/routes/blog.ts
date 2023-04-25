import { Express } from 'express';
import * as BlogEp from "../end-points/Blog.ep";

export function BlogRoutesInit(app:Express){
    app.post('/api/auth/blogs/add', BlogEp.create());
}