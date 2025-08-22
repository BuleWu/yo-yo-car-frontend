import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../auth/services/authentication.service';
import {map, Observable} from 'rxjs';
import {Rating} from '../../../shared/models/rating/rating-models';
import {deepObjSnakeToCamelCase} from '../../../common/generic/utils/data-manipulation/deep-obj-snake-to-camel-case';
import {environment} from '../../../../environments/environment.development';

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
  ) { }

  private readonly apiUrl = `${environment.baseUrl}/api/ratings`;

  public getAllRatings(): Observable<Rating[]> {
    return this._httpClient.get(`${this.apiUrl}`)
      .pipe(map(deepObjSnakeToCamelCase));
  }

  public getRatingById(id: string): Observable<Rating> {
    return this._httpClient.get<Rating>(`${this.apiUrl}/${id}`)
      .pipe(map(deepObjSnakeToCamelCase));
  }

  public getRatingsByUserId(userId: string): Observable<Rating[]> {
    return this._httpClient.get<Rating[]>(`${this.apiUrl}/users/${userId}`)
      .pipe(map(deepObjSnakeToCamelCase));
  }

  public createRating(formData: createRatingFormData, raterId: string, ratedUserId: string, rideId: string): Observable<Rating> {
    return this._httpClient.post<Rating>(`${this.apiUrl}`, {
      ...formData,
      rater_id: raterId,
      rated_user_id: ratedUserId,
      ride_id: rideId
    })
      .pipe(map(deepObjSnakeToCamelCase));
  }

  public updateRating(id: string, formData: createRatingFormData): Observable<Rating> {
    return this._httpClient.put<Rating>(`${this.apiUrl}/${id}`, {
      ...formData,
    })
      .pipe(map(deepObjSnakeToCamelCase));
  }

  public deleteRating(id: string): Observable<void> {
    return this._httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
