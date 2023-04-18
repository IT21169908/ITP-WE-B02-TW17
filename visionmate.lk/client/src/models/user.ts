/**
 * This is sample interface.Modify or use it as your want.
 *
 * @author M.M.N.H. Fonseka
 * */
import { Role } from "../enums/Role";

export default interface User {
    _id: string,
    name: string,
    email: string,
    phone: string,
    role: Role;
    createdAt: string,
    updatedAt: string,
}
