import { DUser, IUser } from "./User.model";

interface Education {
    school: string;
    degree: string;
    year: number;
}

interface Experience {
    hospital: string;
    department: string;
    position: string;
    startYear: number;
    endYear?: number;
}

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

export interface DDoctor extends CommonAttributes, DUser {
    specialties?: string[];
    education?: Education[];
    experience?: Experience[];
    languages?: string[];
    awards?: string[];
}

export interface IDoctor extends CommonAttributes, IUser {
    specialties?: string[];
    education?: Education[];
    experience?: Experience[];
    languages?: string[];
    awards?: string[];
}


