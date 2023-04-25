import { Express, Request, Response } from "express";
import { AdminRoutesInit } from "./admin";
import { AuthRoutesInit } from "./auth";
import { PatientRoutesInit } from "./patient";
import createHttpError from "http-errors";
import { BlogRoutesInit } from "./blog";

export function initRoutes(app: Express) {
    /* TOP LEVEL REQUESTS */
    app.get('/api', (req: Request, res: Response) => res.sendSuccess("VisionMate™ API"));

    AuthRoutesInit(app);
    AdminRoutesInit(app);
    PatientRoutesInit(app);
    BlogRoutesInit(app);

    /* INVALID REQUESTS */
    app.get('/', (req: Request, res: Response) => res.redirect(301, "/api"));
    app.use((req, res, next) => next(new createHttpError.NotFound()));
    // app.all('*', (req: Request, res: Response) => res.send("Invalid Route").status(404));

}
