/**
 * User Controller
 *
 * @author M.M.N.H.Fonseka
 */

import { RequestHandler } from "express";
import UserModel from "../models/user";

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
      const user = await UserModel.findById(user_id).exec();
      res.status(200).json(user);
   } catch (error) {
      next(error);
   }
};

export const update: RequestHandler = async (req, res, next) => {
   try {
      const user_id = req.params.user;

      // update the user here
   } catch (error) {
      next(error);
   }
};
export const destroy: RequestHandler = async (req, res, next) => {
   // destroy the user here
};
