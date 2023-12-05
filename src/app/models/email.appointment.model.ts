export interface EmailAppointmentModel{
    hash: string;
    to_destination: string[];
    name: string;
    text: string;
    date: string;
    address: string;
    reason: string;
    name_patient: string;
    cc_patient: string;
    phone_patient: string;
    email_patient: string;
    name_doctor: string;
    cc_doctor: string;
    phone_doctor: string;
    email_doctor: string;
    problem: string;
    relationship: string;
}