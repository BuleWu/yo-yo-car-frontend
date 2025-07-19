import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  baseUrl = "http://localhost:8080";

  public loginUser(
    email: string,
    password: string,
  ): Observable<any> { // TODO: change the type to token
    console.log('In login user...');
    return this._httpClient.post(`${this.baseUrl}/auth/login`, // TODO: add getBaseUrl which pull URL from config json
      {
        email: email,
        password: password
      });
  }

  public registerUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Observable<any> { // TODO: change the type to token
    return this._httpClient.post(`${this.baseUrl}/auth/register`,
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      });
  }
}
