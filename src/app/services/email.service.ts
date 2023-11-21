import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailModel } from '../models/email.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  server: string = `${environment.server}/email`;
  constructor(
    private http: HttpClient,
  ) { }

  send_email(data: EmailModel): Observable<string> {
    return this.http.post<string>(`${this.server}/send_email_register`, data)
  }
}
