export interface AppointmentGetModel {
    id: number;
    reason: string;
    date: Date;
    state: string;
    doctor_name: string;
    patient_name: string;
    doctor_id: number;
    patient_id: number;
    doctor_photo: string;
    doctor_email: string;
    patient_photo: string;
    patient_address: string;
    patient_email: string;
    }