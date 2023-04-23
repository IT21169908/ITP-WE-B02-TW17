import {NextFunction, Request, Response} from "express";
import { UserDao } from "../dao/User.dao";
import {AppLogger} from "../utils/logging";
import { IUser } from "../models/User.model";

export namespace UserEp {

    export function getSelf(req: Request, res: Response, next: NextFunction) {
        const user = req.user as IUser;
        if (user) {
            AppLogger.info(`Get user for id ${user._id}`);
            UserDao.getUser(user._id).then((user: IUser) => {
                AppLogger.info(`Found user ${!!user}`);
                (res as any).sendSuccess(user);
            }).catch(next);
        }
    }

}
