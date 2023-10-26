import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  getToken(): string {
    const token = sessionStorage.getItem('token')
    if (token) {
      return token;
    }
    return '';
  }

  deleteToken(): void {
    sessionStorage.removeItem('token');
  }

}
