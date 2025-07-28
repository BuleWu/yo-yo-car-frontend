import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {LocalStorageService} from "../../../services/local-storage/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private _httpClient: HttpClient,
    private _router: Router,
    private _localStorageService: LocalStorageService
  ) { }

  baseUrl = "http://localhost:8080";

  public loginUser(
    email: string,
    password: string,
  ): Observable<string> { // TODO: change the type to token
    return this._httpClient.post<string>(`${this.baseUrl}/auth/login`, // TODO: add getBaseUrl which pull URL from config json
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
  ): Observable<string> { // TODO: change the type to token
    return this._httpClient.post<string>(`${this.baseUrl}/auth/register`,
      {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password
      });
  }

  public authenticateWithGoogle(): void {
    window.location.href = `${this.baseUrl}/auth/google/login`;
  }

  public getAuthorizationToken(): string {
      return this._localStorageService.getItem('access_token') as string
  }

  public isAuthenticated(): boolean {
      const parsedToken = this._localStorageService.getItem('token_parsed');
      if(parsedToken) {
          try {
            const accessToken = JSON.parse(parsedToken);

            const now = Date.now();
            const exp = accessToken.exp * 1000;

            return exp > now;
          } catch (e) {
              return false;
          }
      }

      return false;
  }

  public getUserId(): string {
    return JSON.parse(this._localStorageService.getItem('token_parsed') as string).user_id;
  }

  public logout(): void {
    this._localStorageService.removeItem('access_token');
    this._localStorageService.removeItem('token_parsed');
  }
}
