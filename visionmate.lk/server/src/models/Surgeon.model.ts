import { DUser, IUser } from "./User.model";

interface CommonAttributes {
    about?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
    isActive?: boolean;
}

export interface DSurgeon extends CommonAttributes, DUser {
    surgeriesPerformed?: number;
    specialties?: string[];
    education?: {
        school: string;
        degree: string;
        year: number;
    }[];
    status?: string;
}

export interface ISurgeon extends CommonAttributes, IUser {
    surgeriesPerformed?: number;
    specialties?: string[];
    education?: {
        school: string;
        degree: string;
        year: number;
    }[];
    status?: string;
}
