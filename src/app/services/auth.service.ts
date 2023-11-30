import { Injectable } from '@angular/core';
import { Credentials } from '../models/credentials.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.local';
import { BehaviorSubject, tap } from 'rxjs';
import { StorageService } from './storage.service';
import { TokenModel } from '../models/token.model';
import { addToken } from '../interceptors/token.interceptor';
import { ResponseCustomModel } from '../models/response.custom.model';
import { UserGetWithMenusModel } from '../models/user.model';
import { SockectioService } from './sockectio.service';
import { ResponseChangePasswordModel } from '../models/response.change.password';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  server: string = `${environment.server}/account`;
  user = new BehaviorSubject<UserGetWithMenusModel | null>(null);
  user$ = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  login(credentials: Credentials): Observable<TokenModel> {
    return this.http.post<TokenModel>(`${this.server}/login`, credentials)
      .pipe(
        tap(response => {
          this.storageService.saveToken(response.token);
          this.validateToken().subscribe();
        })
      );
  }

  validateToken(): Observable<ResponseCustomModel<UserGetWithMenusModel>> {
    return this.http.get<ResponseCustomModel<UserGetWithMenusModel>>(`${this.server}/validate_token`, { context: addToken() })
    .pipe(tap(response =>{
        this.user.next(response.data)
      })
      );
  };

  logout(): void {
    this.storageService.deleteToken();
    this.user.next(null);
  }

  recoveryPassword(email: string): Observable<ResponseCustomModel<boolean>> {
    return this.http.post<ResponseCustomModel<boolean>>(`${this.server}/recovery_password`, { email });
  }

  changePassword(password: string, token: string): Observable<ResponseChangePasswordModel> {
    return this.http.post<ResponseChangePasswordModel>(`${this.server}/change_password`, { password, token });
  }
}
