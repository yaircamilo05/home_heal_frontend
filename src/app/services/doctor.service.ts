import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.local';
import { ResponseCustomModel } from '../models/response.custom.model';
import { DoctorModel } from '../models/doctor.model';
import { UserCreateModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  server: string = `${environment.server}/doctor`;
  constructor(
    private http: HttpClient,
  ) { }

  getDoctors() {
    return this.http.get(`${this.server}/get_all_doctors`);
  }

  getDoctorById(id: number) {
    return this.http.get(`${this.server}/get_doctor_by_id/${id}`);
  }

  getDoctorByUserId(userId: number): Observable<ResponseCustomModel<DoctorModel>> {
    return this.http.get<ResponseCustomModel<DoctorModel>>(`${this.server}/get_doctor_by_user_id/${userId}`);
  }

  createDoctor(doctor: UserCreateModel) {
    return this.http.post(`${this.server}/create_doctor`, doctor);
  }

  getDoctorsBySpecialty(speciality: string): Observable<ResponseCustomModel<DoctorModel[]>> {
    return this.http.get<ResponseCustomModel<DoctorModel[]>>(`${this.server}/get_doctors_by_speciality/${speciality}`);
  }


}
