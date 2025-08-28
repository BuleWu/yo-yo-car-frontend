import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {User} from '../../../shared/models/user/user-models';
import {deepObjSnakeToCamelCase} from '../../../common/generic/utils/data-manipulation/deep-obj-snake-to-camel-case';
import {Reservation} from '../../../shared/models/reservation/reservation-models';
import {environment} from '../../../../environments/environment.development';

export interface UpdateUserData {
  firstName: string;
  lastName: string;
  vehicle: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserProviderService {

  private readonly apiUrl = `${environment.baseUrl}/api/users`;

  constructor(
    private _http: HttpClient
  ) { }

  /** GET /users/:id */
  getUserById(id: string): Observable<User> {
    return this._http.get<User>(`${this.apiUrl}/${id}`)
      .pipe(map(deepObjSnakeToCamelCase));
  }

  /** POST /users */
 /* createUser(userData: createUserData): Observable<User> {
    return this._http.post<User>(this.apiUrl, userData)
      .pipe(map(deepObjSnakeToCamelCase));
  }*/

  updateUser(id: string, user: UpdateUserData): Observable<User> {
    return this._http.put<User>(`${this.apiUrl}/${id}`, {
      first_name: user.firstName,
      last_name: user.lastName,
      vehicle: user.vehicle,
    })
      .pipe(map(deepObjSnakeToCamelCase));
  }

  /** DELETE /users/:id */
  deleteUser(id: string): Observable<void> {
    return this._http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /** POST /users/:id/profile-picture */
  uploadProfilePicture(id: string, formData: FormData): Observable<string> {
    return this._http.post<string>(`${this.apiUrl}/${id}/profile-picture`, formData);
  }

  changePassword(currentPassword: string, newPassword: string): Observable<void> {
    return this._http.post<void>(`${this.apiUrl}/change-password`, {
      currentPassword,
      newPassword
    });
  }

  public getUserReservations(id: string): Observable<Reservation[]> {
    return this._http.get<Reservation[]>(`${this.apiUrl}/${id}/reservations`)
      .pipe(map((res) => deepObjSnakeToCamelCase(res)));
  }
}
