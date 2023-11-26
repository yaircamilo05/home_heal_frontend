import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.local';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppointmentGetModel } from '../models/appointment.model';
import { ResponseCustomModel } from '../models/response.custom.model';
@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  server: string = `${environment.server}/appointment`;


  constructor(
    private http: HttpClient,
    private strorageService: StorageService
  ) { }

  getAppointmentsByUser(): Observable<ResponseCustomModel<AppointmentGetModel[]>>{
    const user = this.strorageService.getUserId();
    return this.http.get<ResponseCustomModel<AppointmentGetModel[]>>(`${this.server}/get_appointments_by_userId/${user}`
    );
  }
}