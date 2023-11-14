import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCreateModel, UserGetModel } from '../models/user.model';
import { ResponseCustomModel } from '../models/response.custom.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  server: string = `${environment.server}/user`;
  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Method to obtain the users in the database
   * @returns List of users
   */
  getAllUsers(): Observable<ResponseCustomModel<UserGetModel[]>> {
    return this.http.get<ResponseCustomModel<UserGetModel[]>>(`${this.server}/get_all_users`);
  }

  deleteUser(id:number): Observable<ResponseCustomModel<boolean>>{
    return this.http.delete<ResponseCustomModel<boolean>>(`${this.server}/delete_user/${id}`);
  } 

  /**
   * Method to create a user
   * @param user User to create
   * @returns User created
   */
  createUser(user: UserCreateModel): Observable<ResponseCustomModel<UserGetModel>> {  
    return this.http.post<ResponseCustomModel<UserGetModel>>(`${this.server}/create_user`, user);
  }

  updateUser(user: UserCreateModel, id:number): Observable<ResponseCustomModel<UserGetModel>>{
    return this.http.put<ResponseCustomModel<UserGetModel>>(`${this.server}/edit_user/${id}`,user);
  }

}
