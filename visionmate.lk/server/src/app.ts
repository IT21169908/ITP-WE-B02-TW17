// <reference path="global.d.ts" />
import "dotenv/config";
import express from "express";
import { Role } from "./enums/auth";
import { Authentication } from "./middleware/authentication";
import { handleError } from "./middleware/error-handler";
import { RequestLoggerHandler } from "./middleware/request-logger";
import { ResponseHandler } from "./middleware/response-handler";
import { verifyRole } from "./middleware/verify-role";
import * as routes from "./routes";
import apiRoutes from "./routes/api";
import webRoutes from "./routes/web";
import morgan from "morgan";
import cors from 'cors';
import { jsonErrorHandler } from "./utils/error-handler";

const isProduction = process.env.NODE_ENV === "production";
const app = express();

app.use(RequestLoggerHandler);
app.use(ResponseHandler);

app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({limit: '20mb', extended: true}));

if (!isProduction) {
    app.use(morgan("dev"));
    app.use(cors({
        optionsSuccessStatus: 200,
        origin: '*',
        allowedHeaders: ['Content-Type, Access-Control-Allow-Headers, Access-Control-Allow-Origin, Authorization, X-Requested-With', 'Cache-Control']
    }));
} else {
    app.use(morgan('combined'));
    app.use(cors());
}

app.use("/", webRoutes);
app.use('/api/auth', Authentication.verifyToken);
app.use('/api/admin', Authentication.verifyToken);
app.use('/api/patient', Authentication.verifyToken);

app.use('/api/admin', Authentication.verifyToken, verifyRole([Role.ADMIN]));
app.use('/api/patient', Authentication.verifyToken, verifyRole([Role.PATIENT]));
routes.initRoutes(app);

app.use(jsonErrorHandler);

export default app;
