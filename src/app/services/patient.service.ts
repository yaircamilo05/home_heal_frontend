import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.local';
import { PatientRegister } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  server: string = `${environment.server}/patient`;
  constructor(
    private http: HttpClient,
  ) { }

  register_patient(patient: PatientRegister) {
  
    return this.http.post(`${this.server}/register_user`, patient);
  }
}
