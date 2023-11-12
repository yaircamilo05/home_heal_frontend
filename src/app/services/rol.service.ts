import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.local';
import { RolOutModel, RolModel } from '../models/rol.model';
import { Observable } from 'rxjs';
import { ResponseCustomModel } from '../models/response.custom.model';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  server = `${environment.server}/rol`

  constructor(
    private http: HttpClient,
  ) { }

  createRole(data: RolModel): Observable<ResponseCustomModel<RolOutModel>> {
    return this.http.post<ResponseCustomModel<RolOutModel>>(`${this.server}/role`, data);
  }

  getRoles(): Observable<ResponseCustomModel<RolOutModel[]>> {
    return this.http.get<ResponseCustomModel<RolOutModel[]>>(`${this.server}/roles`);
  }

  getRole(id: number): Observable<ResponseCustomModel<RolOutModel>> {
    return this.http.get<ResponseCustomModel<RolOutModel>>(`${this.server}/role/${id}`);
  }

  updateRole(id: number | undefined, data: RolModel): Observable<ResponseCustomModel<RolOutModel>> {
    return this.http.put<ResponseCustomModel<RolOutModel>>(`${this.server}/role/${id}`, data);
  }

  deleteRole(id: number | undefined): Observable<ResponseCustomModel<boolean>> {
    return this.http.delete<ResponseCustomModel<boolean>>(`${this.server}/role/${id}`);
  }

}
