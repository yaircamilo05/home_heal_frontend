import { MenuGetModel } from "./menu.model";

export interface RolWithMenusModel {
  id: number;
  name: string;
  description : string;
  menus: MenuGetModel[];
}
