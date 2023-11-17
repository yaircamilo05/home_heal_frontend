import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.local';
import { PatientRegister } from '../models/patient.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  server: string = `${environment.server}/patient`;
  constructor(
    private http: HttpClient,
  ) { }

  register_patient(patient: FormData) {
    return this.http.post(`${this.server}/register_user`, patient);
  }

  get_default_image(): Observable<Blob> {
    return this.http.get('assets/images/userImageNotFound.png', { responseType: 'blob' });
  }
}
