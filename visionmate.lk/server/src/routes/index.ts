import { Express, Request, Response } from "express";
import { AuthRoutesInit } from "./auth";

export function initRoutes(app: Express) {
    /* TOP LEVEL REQUESTS */
    app.get('/api', (req: Request, res: Response) => (res as any).sendSuccess("VisionMate™ API"));

    AuthRoutesInit(app);

    /* INVALID REQUESTS */
    // TODO: Discuss about web.ts routes
    app.get('/', (req: Request, res: Response) => res.redirect(301, "/api"));
    app.all('*', (req: Request, res: Response) => (res as any).sendError("Invalid Route"));
}
