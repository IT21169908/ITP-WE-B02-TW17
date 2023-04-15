/**
 * Main app
 *
 * @author M.M.N.H.Fonseka
 */

import "dotenv/config";
import express from "express";
import apiRoutes from "./routes/api";
import webRoutes from "./routes/web";
import morgan from "morgan";
import cors from 'cors';
import {jsonErrorHandler} from "./util/error-handler";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);
app.use("/", webRoutes);

app.use(jsonErrorHandler);

export default app;
