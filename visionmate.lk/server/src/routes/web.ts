/**
 * Main API routes
 *
 * @author M.M.N.H.Fonseka
 */

import express from "express";
import createHttpError from "http-errors";

const router = express.Router();

router.get("/", async (req, res) => {
    res.send("Server is running...").status(200);
});

router.get('/favicon.ico', (req, res) => res.status(204));

router.use((req, res, next) => {
    next(new createHttpError.NotFound());
});

export default router;