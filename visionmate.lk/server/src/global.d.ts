import http from "http";
import https from "https";

type IUser = import('./models/User.model').IUser;
// type IAdmin = import('./models/Admin.model').IAdmin;
type ObjectId = import('mongoose').Types.ObjectId;
type Server = https.Server | http.Server;

declare global {
    namespace Express {
        export interface Request {
            user?: User;
            // admin?: IAdmin;
        }

        export interface Response {
            sendSuccess: (data: unknown, message?: string) => void;
            sendError: (error: unknown, errorCode?: number) => void;
        }

        interface User extends IUser {
            _id: ObjectId;
        }
    }
}
