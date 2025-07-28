import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {User} from '../../../shared/models/user/user-models';
import {deepObjSnakeToCamelCase} from '../../../common/generic/utils/data-manipulation/deep-obj-snake-to-camel-case';

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

  /** DELETE /users/:id */
  deleteUser(id: string): Observable<string> {
    return this._http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

  /** POST /users/:id/profile-picture */
  uploadProfilePicture(userId: string, file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this._http.post(`${this.apiUrl}/${userId}/profile-picture`, formData, {
      responseType: 'text'
    });
  }
}
