import { Permission } from "../enums/Permission";
import { Role } from "../enums/Role";
import { Upload } from "./Upload";

interface User {
    name: string;
    email: string;
    phone?: string;
    role: Role;
    permissions?: Permission[];
    signedUpAs?: string;
    lastLoggedIn?: Date;
    photo?: Upload;
}

export default User;
