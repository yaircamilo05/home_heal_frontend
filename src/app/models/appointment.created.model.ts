export interface AppointmentCreatedModel{
    data_appointment: {
        id: number;
        reason: string;
        date: string;
        doctor_patients_id: number;
        state: string;
    },
    data_patient: {
        patient_id: number;
        full_name: string;
        phone: string;
        cc: string;
        email: string;
        address: string;
    }
}