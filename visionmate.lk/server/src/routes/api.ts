/**
 * Main API routes
 *
 * @author M.M.N.H.Fonseka
 */

import express from "express";
import * as UserController from "../controllers/user-controller";

const router = express.Router();


router.get("/users", UserController.getUsers);
router.post("/users", UserController.store);
router.get("/users/:user", UserController.show);
router.patch("/users/:user", UserController.update);
router.delete("/users/:user", UserController.destroy);

export default router;
