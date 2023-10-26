import { Injectable } from '@angular/core';
import { Credentials } from '../models/credentials.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.local';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  server: string = environment.server;

  constructor(private http: HttpClient) { }

  login(credentials:Credentials):Observable<string>{
    return this.http.post<string>(`${this.server}/account`,credentials)
          .pipe(
            tap(response => {
              this.tokenservice.saveToken(response.data);
              this.getProfile().subscribe();
            })
          );
  }
}
