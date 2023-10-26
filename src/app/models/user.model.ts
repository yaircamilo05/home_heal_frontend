import { MenuGetModel } from "./menu.model";

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
    menus: MenuGetModel[];
}
