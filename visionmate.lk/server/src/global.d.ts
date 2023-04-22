type IUser = import('./models/User.model').IUser;
// type IAdmin = import('./models/Admin.model').IAdmin;
type ObjectId = import('mongoose').Types.ObjectId;

declare namespace Express {
    export interface Request {
        user?: User;
        // admin?: IAdmin;
    }

    export interface Response {
        sendSuccess: (data: any, message?: string) => void;
        sendError: (error: any, errorCode?: number) => void;
    }

    interface User extends IUser {
        _id: ObjectId;
    }
}
