import { Injectable } from '@angular/core';
import { UserGetWithMenusModel } from 'src/app/models/user.model';

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

  saveUserId(userId: number){
    sessionStorage.setItem('userId', JSON.stringify(userId));
  }

  saveRolId(roleId: number){
    sessionStorage.setItem('roleId', JSON.stringify(roleId));
  }

  getRolId(): number{
    const roleId = sessionStorage.getItem('roleId');
    if(roleId){
      return roleId as unknown as number;
    }
    return 0;
  }

  saveUserName(user: string)
  {
    sessionStorage.setItem('username', user);
  }

  getUserName(): string{
    const user = sessionStorage.getItem('username');
    if(user){
      return user;
    }
    return '';
  }
  getUserId(): number{
    const userId = sessionStorage.getItem('userId');
    if(userId){
      return userId as unknown as number;
    }
    return 0;
  }





}
