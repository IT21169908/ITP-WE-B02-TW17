/**
 * User Controller
 *
 * @author M.M.N.H.Fonseka
 */

import {RequestHandler} from "express";
import UserModel from "../schemas/User.schema";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getUsers: RequestHandler = async (req, res, next) => {
    try {
        // throw Error("Error!");
        const users = await UserModel.find().exec();
        res.send(users);
    } catch (error) {
        next(error);
    }
};

export const store: RequestHandler = async (req, res, next) => {
    // save the user here
};

export const show: RequestHandler = async (req, res, next) => {
    try {
        const user_id = req.params.user;
        if (!mongoose.isValidObjectId(user_id)) {
            throw createHttpError(400, "Invalid user id");
        }
        const user = await UserModel.findById(user_id).exec();

        if (!user) {
            throw createHttpError(404, "User not found");
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const update: RequestHandler = async (req, res, next) => {
    try {
        const user_id = req.params.user;
        if (!mongoose.isValidObjectId(user_id)) {
            throw createHttpError(400, "Invalid user id");
        }
        // update the user here
    } catch (error) {
        next(error);
    }
};
export const destroy: RequestHandler = async (req, res, next) => {
    // destroy the user here
};
