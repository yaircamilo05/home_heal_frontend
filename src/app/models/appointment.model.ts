export interface AppointmentGetModel {
    id: number;
    reason: string;
    date: Date;
    state: string;
    doctor_name: string;
    patient_name: string;
    doctor_id: number;
    patient_id: number;
    DoctorImageUrl: string;
    PatientImageUrl: string;
    PatientDirection: string;
    }