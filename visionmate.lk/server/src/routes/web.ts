/**
 * Main API routes
 *
 * @author M.M.N.H.Fonseka
 */

import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
    res.send("Server is running...").status(200);
});

router.get('/favicon.ico', (req, res) => res.status(204));

router.use((req, res, next) => {
    next(Error("404 URL not found!"));
});

export default router;