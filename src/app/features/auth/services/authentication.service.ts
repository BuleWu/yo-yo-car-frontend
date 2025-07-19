import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private _httpClient: HttpClient,
    private _router: Router,
  ) { }

  baseUrl = "http://localhost:8080";

  public loginUser(
    email: string,
    password: string,
  ): Observable<any> { // TODO: change the type to token
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
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password
      });
  }

  public authenticateWithGoogle(): void {
    /*this._router.navigateByUrl(`${this.baseUrl}/auth/google/login`);*/
    window.location.href = `${this.baseUrl}/auth/google/login`
  }
}
