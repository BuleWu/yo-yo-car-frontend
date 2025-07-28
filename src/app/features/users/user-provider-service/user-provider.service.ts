import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {User} from '../../../shared/models/user/user-models';
import {deepObjSnakeToCamelCase} from '../../../common/generic/utils/data-manipulation/deep-obj-snake-to-camel-case';

export interface UpdateUserData {
  firstName: string;
  lastName: string;
  vehicle: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserProviderService {

  private readonly apiUrl = 'http://localhost:8080/api/users';

  constructor(
    private _http: HttpClient
  ) { }

  /** GET /users/:id */
  getUserById(id: string): Observable<User> {
    return this._http.get<User>(`${this.apiUrl}/${id}`)
      .pipe(map(deepObjSnakeToCamelCase));
  }

  /** POST /users */
  createUser(userData: any): Observable<User> {
    return this._http.post<User>(this.apiUrl, userData)
      .pipe(map(deepObjSnakeToCamelCase));
  }

  updateUser(id: string, user: UpdateUserData): Observable<User> {
    return this._http.put<User>(`${this.apiUrl}/${id}`, {
      first_name: user.firstName,
      last_name: user.lastName,
      vehicle: user.vehicle,
    })
      .pipe(map(deepObjSnakeToCamelCase));
  }

  /** DELETE /users/:id */
  deleteUser(id: string): Observable<string> {
    return this._http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

  /** POST /users/:id/profile-picture */
  uploadProfilePicture(id: string, file: FormData): Observable<string> {
    return this._http.post<string>(`${this.apiUrl}/${id}/profile-picture`, file);
  }

  changePassword(currentPassword: string, newPassword: string) {
    return this._http.post(`${this.apiUrl}/change-password`, {
      currentPassword,
      newPassword
    });
  }
}
