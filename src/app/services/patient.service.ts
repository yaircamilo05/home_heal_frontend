import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.local';
import { PatientRegister } from '../models/patient.model';
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

  /**
   * 
   * @returns void
   */
  get_default_image(): Observable<Blob> {
    return this.http.get('assets/images/userImageNotFound.png', { responseType: 'blob' });
  }

  /**
   * Method to calculate the age of a patient
   * @param birthdate 
   * @returns 
   */
  calculateAge(birthdate: Date): number {
    const actualDate = new Date();
    const actualYear = actualDate.getFullYear();
    const actualMounth = actualDate.getMonth() + 1;
    const actualDay = actualDate.getDate();

    const birthYear = birthdate.getFullYear();
    const mounthYear = birthdate.getMonth() + 1;
    const birthDay = birthdate.getDate();

    let age = actualYear - birthYear;

    if (actualMounth < mounthYear || (actualMounth === mounthYear && actualDay < birthDay)) {
      age--;
    }

    return age;
  }
}
