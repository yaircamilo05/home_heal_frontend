import { MenuGetModel } from "./menu.model";
import { RolOutModel } from "./rol.model";

export interface UserCreateModel {
    name: string;
    lastname: string;
    email: string;
    image_url: string;
    rol_id: number;
    password: string;
    
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
}
