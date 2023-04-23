/**
 * Main API routes
 *
 * @author M.M.N.H.Fonseka
 */

import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("VisionMate™ Eye care").status(200);
});

router.get('/favicon.ico', (req, res) => res.status(204));

export default router;