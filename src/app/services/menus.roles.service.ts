import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.local';
import { RolWithMenusModel } from '../models/rol.with.menus.model';
import { Observable } from 'rxjs';
import { ResponseCustomModel } from '../models/response.custom.model';
import { MenuGetModel } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenusRolesService {
  rol_server: string = `${environment.server}/rol`;
  server: string = `${environment.server}/rol_menu`;


  constructor(
    private http: HttpClient,

  ) { }
  getAllRolsWithMenus(): Observable<ResponseCustomModel<RolWithMenusModel[]>> {
    return this.http.get<ResponseCustomModel<RolWithMenusModel[]>>(`${this.rol_server}/roles_with_menus`);
  }

  asignMenuToRole(rol_id: number, menu_id: number): Observable<ResponseCustomModel<MenuGetModel[]>> {
    return this.http.post<ResponseCustomModel<MenuGetModel[]>>(
      `${this.server}/asign_menu_to_role`,
      { "rol_id": rol_id, "menu_id": menu_id }
    );
  }

  deleteMenuToRole(rol_id: number, menu_id: number): Observable<ResponseCustomModel<boolean>> {
    return this.http.delete<ResponseCustomModel<boolean>>(`${this.server}/delete_menu_to_role/${rol_id}/${menu_id}`);
  }


}
