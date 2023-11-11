import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.local';
import { RolWithMenusModel } from '../models/rol.with.menus.model';
import { Observable } from 'rxjs';
import { ResponseCustomModel } from '../models/response.custom.model';

@Injectable({
  providedIn: 'root'
})
export class MenusRolesService {
  server: string =`${environment.server}/rol`;


  constructor(
    private http: HttpClient,

  ) { }


  getAllRolsWithMenus(): Observable<ResponseCustomModel<RolWithMenusModel[]>>{
    return this.http.get<ResponseCustomModel<RolWithMenusModel[]>>(`${this.server}/roles_with_menus`);
  }


}
