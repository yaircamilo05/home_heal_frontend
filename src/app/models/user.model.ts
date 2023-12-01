import { MenuGetModel } from "./menu.model";
import { RolOutModel } from "./rol.model";

export interface UserCreateModel {
    name: string;
    lastname: string;
    email: string;
    image_url: string;
    rol_id: number;
    cc: string;
    phone: string;
    password: string;
    specialty: string;
    
}

export interface UserGetWithMenusModel extends UserCreateModel {
    name: string;
    lastname: string;
    email: string;
    rol_id: number;
    image_url: string;
    menus: MenuGetModel[];
    rol: RolOutModel
}

export interface UserGetModel {
    id: number;
    name: string;
    lastname: string;
    email: string;
    rol_id: number;
    image_url: string;
    cc: string;
    phone: string;
    rol: RolOutModel
    specialty: string;
}


export interface UserBD{
    image_url: string;
    id: number;
    password: string;
    phone: string;
    rol_id: number;
    lastname: string;
    name: string;
    email: string;  
    cc: string;
}