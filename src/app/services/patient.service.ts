import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.local';
import { PatientCard, PatientRegister } from '../models/patient.model';
import { Observable } from 'rxjs';
import { ResponseCustomModel } from '../models/response.custom.model';

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

   /**
   * Method to obtain the patients in the database
   * @returns List of patients
   */
   getPatients(): Observable<ResponseCustomModel<PatientRegister[]>> {
    return this.http.get<ResponseCustomModel<PatientRegister[]>>(`${this.server}/get_all_patients`);
  }

  getPatientsByDoctorId(doctor_id: number): Observable<ResponseCustomModel<PatientCard[]>> {
    return this.http.get<ResponseCustomModel<PatientCard[]>>(`${this.server}/get_patients_by_doctor_id/${doctor_id}`);
  }

  getPatientById(id: number): Observable<ResponseCustomModel<PatientCard>> {
    return this.http.get<ResponseCustomModel<PatientCard>>(`${this.server}/get_patient_by_id/${id}`);
  }
  /**
   *
   * @returns void
   */
  get_default_image(): Observable<Blob> {
    return this.http.get('assets/images/userImageNotFound.png', { responseType: 'blob' });
  }

}
