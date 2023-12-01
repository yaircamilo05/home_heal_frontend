import { UserBD } from "./user.model";

export interface Doctor {
    id: number;
    user_id: number;
    specialty: string;
    user: UserBD;
}