import * as mongoose from "mongoose";
import { StringOrObjectId } from "../types/util-types";

export interface TreatmentPlan {
    plan: string;
    date: Date;
    notes?: string;
}

export interface Medication {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    notes?: string;
}

export interface Procedure {
    name: string;
    date: Date;
    notes?: string;
}

interface CommonAttributes {
    title: string;
    description: string;
    treatmentPlan: TreatmentPlan[]; // The recommended treatment plan for the patient's condition.
    startDate: Date;
    endDate: Date;
}

export interface DTreatmentPlan extends CommonAttributes {
    _id?: StringOrObjectId;
    patientId?: StringOrObjectId;
    doctorId?: StringOrObjectId;
    diagnosis?: string;
    medications?: Medication[]; // Any medications that have been prescribed for the patient.
    procedures?: Procedure[];
    instructions?: string;
    referral: string; // If the patient needs to be referred to a specialist, this field would indicate the name of the specialist and any other relevant information.
    progressNotes?: string; // Any notes on the patient's progress or changes to the treatment plan.
}

export interface ITreatmentPlan extends CommonAttributes, mongoose.Document {
    patientId?: StringOrObjectId;
    doctorId?: StringOrObjectId;
    diagnosis?: string;
    medications?: Medication[];
    procedures?: Procedure[];
    instructions?: string;
    referral?: string;
    progressNotes?: string;
}
