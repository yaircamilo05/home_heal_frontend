import { UserBD } from "./user.model";

export interface Doctor {
    id: number;
    user_id: number;
    specialty: string;
    user: UserBD;
}export interface DoctorModel{
  id: number;
  user_id: number;
  speciality: string;
}
