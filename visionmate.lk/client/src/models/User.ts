import {Permission} from "../enums/Permission";
import {Role} from "../enums/Role";
import {IUpload} from "./Upload";

interface IUser {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: Role;
    permissions?: Permission[];
    signedUpAs?: string;
    lastLoggedIn: string;
    photo?: IUpload;

    [key: string]: string | number | Date | Permission[] | IUpload | undefined;
}

export default IUser;
