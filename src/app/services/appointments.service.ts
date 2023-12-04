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

  cancelAppointment(appointment: AppointmentGetModel): Observable<ResponseCustomModel<AppointmentGetModel>>{
    return this.http.patch<ResponseCustomModel<AppointmentGetModel>>(`${this.server}/update_appointment_state/${appointment.id}/2`,null);
  }

  markAppointmentAsDone(appointment: AppointmentGetModel): Observable<ResponseCustomModel<AppointmentGetModel>>{
    return this.http.patch<ResponseCustomModel<AppointmentGetModel>>(`${this.server}/update_appointment_state/${appointment.id}/1`,null);
  }

  getAvailableHoursByDate(date: string, doctor: number): Observable<ResponseCustomModel<string[]>>{
    return this.http.get<ResponseCustomModel<string[]>>(`${this.server}/get_available_hours/${date}/${doctor}`);
  }

}
