import { Doctor } from "./doctor.model";


export interface CaresBaseModel {
    description: string;
    doctor_patient_id: number;
}

export interface Cares extends CaresBaseModel {
    id: number;
    doctor: Doctor[];
}

export interface CaresCreateModel {
    description: string;
    doctor_id: number;
    patient_id: number;
}


