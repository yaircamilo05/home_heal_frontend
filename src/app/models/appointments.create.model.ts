export interface AppointmentCreateModel {
    reason: string;
    date: string;
    hour: string;
    doctor_id: number;
    user_id: number;
}