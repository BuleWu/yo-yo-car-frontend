import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Ride} from '../../../../shared/models/ride/ride-models';
import {AuthenticationService} from '../../../auth/services/authentication.service';
import {deepObjSnakeToCamelCase} from '../../../../common/generic/utils/data-manipulation/deep-obj-snake-to-camel-case';

export interface SearchQuery { // TODO: move somewhere else
  filter: string;
  value: string;
}

export interface createRideData {
  startingPoint: string;
  destination: string;
  maxPassengers: number;
}

export interface updateRideData {
  startingPoint?: string;
  destination?: string;
  maxPassengers?: number;
}

@Injectable({
  providedIn: 'root'
})
export class RideProviderService {

  constructor(
    private _httpClient: HttpClient,
    private _authenticationService: AuthenticationService
  ) { }


  baseUrl = "http://localhost:8080";

  public getAllRides(): Observable<Ride[]> {
    return this._httpClient.get<Ride[]>(`${this.baseUrl}/api/rides`)
      .pipe(map(deepObjSnakeToCamelCase));
  }

  public getRideById(id: string): Observable<Ride> {
    return this._httpClient.get<Ride>(`${this.baseUrl}/api/rides/${id}`)
      .pipe(map(deepObjSnakeToCamelCase));
  }

  public searchRides(query: SearchQuery[]): Observable<Ride[]> {
    let searchQuery = '';
    query.forEach((search, index) => {
      if (index === 0) {
        searchQuery += `${search.filter}=${search.value}`;
      } else {
        searchQuery += `&${search.filter}=${search.value}`;
      }
    })

    return this._httpClient.get<Ride[]>(`${this.baseUrl}/api/rides/search?${searchQuery}`)
      .pipe(map(deepObjSnakeToCamelCase));
  }

  public createRide(formData: createRideData): Observable<Ride> {
    const { startingPoint, destination, maxPassengers } = formData;
    const userId = this._authenticationService.getUserId();

    return this._httpClient.post<Ride>(`${this.baseUrl}/api/rides`, {
      starting_point: startingPoint,
      destination: destination,
      driver_id: userId,
      max_passengers: maxPassengers
    });
  }

  public updateRide(id: string, updatedData: Partial<updateRideData>): Observable<Ride> {
    return this._httpClient.put<Ride>(`${this.baseUrl}/api/rides/${id}`, {
      starting_point: updatedData.startingPoint,
      destination: updatedData.destination,
      max_passengers: updatedData.maxPassengers
    })
      .pipe(map(deepObjSnakeToCamelCase));
  }

  public deleteRide(id: string): Observable<void> {
    return this._httpClient.delete<void>(`${this.baseUrl}/api/rides/${id}`);
  }
}
