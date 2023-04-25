import { Role } from "../enums/auth";

export function getRoleTitle(role: any): string {
    role = role ? parseInt(role.toString()) : null;
    switch (role) {
        case Role.USER:
            return "USER";
        case Role.ADMIN:
            return "ADMIN";
        case Role.PATIENT:
            return "PATIENT";
        default:
            return "Invalid-Role";
    }
}
