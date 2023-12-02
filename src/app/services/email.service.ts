import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailRegisterModel } from '../models/email.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.local';
import { EmailVitalSignsData } from '../models/email.vital.signs';
import { EmailCancellationModel } from '../models/email.cancellation.model';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  server: string = `${environment.server}/email`;
  constructor(
    private http: HttpClient,
  ) { }

  send_email_register_patient(data: EmailRegisterModel): Observable<string> {
    return this.http.post<string>(`${this.server}/send_email_register`, data)
  }

  send_email_register_doctor_admin(data: EmailRegisterModel): Observable<string> {
    return this.http.post<string>(`${this.server}/send_email_doctor_admin`, data)
  }

  send_email_vital_signs(data: EmailVitalSignsData): Observable<string> {
    return this.http.post<string>(`${this.server}/send_email_vital_signs`, data)
  }

  send_email_appointment_cancellation(data: EmailCancellationModel): Observable<string> {
    return this.http.post<string>(`${this.server}/send_email_appointment_cancellation`, data)
  }


}
