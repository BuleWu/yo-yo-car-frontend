import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../auth/services/authentication.service';
import {map, Observable} from 'rxjs';
import {Rating} from '../../../shared/models/rating/rating-models';
import {deepObjSnakeToCamelCase} from '../../../common/generic/utils/data-manipulation/deep-obj-snake-to-camel-case';

export interface createRatingFormData { // TODO: move this somewhere else
  value: number;
  comment: string;
}

@Injectable({
  providedIn: 'root'
})
export class RatingProviderService {

  constructor(
    private _httpClient: HttpClient,
    private _authenticationService: AuthenticationService
  ) { }

  baseUrl = "http://localhost:8080";

  public getAllRatings(): Observable<Rating[]> {
    return this._httpClient.get(`${this.baseUrl}/api/ratings`)
      .pipe(map(deepObjSnakeToCamelCase));
  }

  public getRatingById(id: string): Observable<Rating> {
    return this._httpClient.get<Rating>(`${this.baseUrl}/api/ratings/${id}`)
      .pipe(map(deepObjSnakeToCamelCase));
  }

  public getRatingsByUserId(userId: string): Observable<Rating[]> {
    return this._httpClient.get<Rating[]>(`${this.baseUrl}/api/ratings/users/${userId}`)
      .pipe(map(deepObjSnakeToCamelCase));
  }

  public createRating(formData: createRatingFormData): Observable<Rating> {
    return this._httpClient.post<Rating>(`${this.baseUrl}/api/ratings`, {
      formData /*rater id, rated user id, ride id*/
    })
      .pipe(map(deepObjSnakeToCamelCase));
  }

  public updateRating(id: string, formData: createRatingFormData): Observable<Rating> {
    return this._httpClient.put<Rating>(`${this.baseUrl}/api/ratings/${id}`, {
      formData,
    })
      .pipe(map(deepObjSnakeToCamelCase));
  }

  public deleteRating(id: string): Observable<void> {
    return this._httpClient.delete<void>(`${this.baseUrl}/api/ratings/${id}`);
  }
}
