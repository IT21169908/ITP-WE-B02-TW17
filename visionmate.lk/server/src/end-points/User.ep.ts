import {NextFunction, Request, response, Response} from "express";
import { UserDao } from "../dao/User.dao";
import {AppLogger} from "../common/logging";

export namespace UserEp {

    export function getSelf(req: Request, res: Response, next: NextFunction) {
        // if (req && req.user) {
        //     AppLogger.info(`Get user for id ${req.user._id}`);
        //     UserDao.getUser(req.user._id).then((user: IUser) => {
        //         AppLogger.info(`Found user ${!!user}`);
        //         (res as any).sendSuccess(user); //TODO: check this - res.sendError can't use
        //     }).catch(next);
        // }
    }

}
