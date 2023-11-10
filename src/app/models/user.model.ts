import { MenuGetModel } from "./menu.model";
import { RolOutModel } from "./rol.model";

export interface UserCreateModel {
    name: string;
    lastname: string;
    email: string;
    password: string;
    rol_id: number;
}

export interface UserGetWithMenusModel extends UserCreateModel {
    name: string;
    lastname: string;
    email: string;
    rol_id: number;
    file_img: string;
    menus: MenuGetModel[];
    rol: RolOutModel
}
