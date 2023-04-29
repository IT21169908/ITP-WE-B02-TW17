// <reference path="global.d.ts" />
import "dotenv/config";
import express from "express";
import { Role } from "./enums/auth";
import { Authentication } from "./middleware/authentication";
import { RequestLoggerHandler } from "./middleware/request-logger";
import { ResponseHandler } from "./middleware/response-handler";
import { verifyRole } from "./middleware/verify-role";
import {jsonErrorHandler} from "./middleware/error-handler";
import * as routes from "./routes";
import morgan from "morgan";
import cors from 'cors';
import favicon from 'serve-favicon';
import * as favPath from 'path';

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

app.use(favicon(favPath.join(__dirname, "../resources", "favicon.ico")));
app.use('/api/static', express.static(favPath.join(__dirname, "../resources")));

app.use('/api/auth', Authentication.verifyToken);
app.use('/api/admin', Authentication.verifyToken, verifyRole([Role.ADMIN]));
app.use('/api/patient', Authentication.verifyToken, verifyRole([Role.PATIENT]));
app.use('/api/surgeon', Authentication.verifyToken, verifyRole([Role.SURGEON]));
routes.initRoutes(app);

// Error Handling
app.use(jsonErrorHandler);

export default app;
