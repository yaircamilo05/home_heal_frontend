import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { environment } from 'src/environments/environment.local';
import { MenuGetModel } from '../models/menu.model';
import { ResponseCustomModel } from '../models/response.custom.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  
  server: string =`${environment.server}/menu`;


  constructor(
    private http: HttpClient,

  ) { }
  

  //metodo para crear una lista de menus con todos los menus que se encuentran en la base de datos
  getAllMenus(): Observable<ResponseCustomModel<MenuGetModel[]>>{
    return this.http.get<ResponseCustomModel<MenuGetModel[]>>(`${this.server}/menus`);
  }
    
  //metodo para crear un menu nuevo
  createMenu(data:MenuGetModel): Observable<ResponseCustomModel<MenuGetModel>>{
    return this.http.post<ResponseCustomModel<MenuGetModel>>(`${this.server}/menu`,data);
  }

  //metodo para editar un menu
  editMenu(){

  }
}
