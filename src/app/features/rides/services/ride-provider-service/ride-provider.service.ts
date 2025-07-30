import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Ride} from '../../../../shared/models/ride/ride-models';
import {AuthenticationService} from '../../../auth/services/authentication.service';
import {deepObjSnakeToCamelCase} from '../../../../common/generic/utils/data-manipulation/deep-obj-snake-to-camel-case';
import {RideSearchFilter} from '../../../../ride-search-page/enums/enum';
import {Reservation} from '../../../../shared/models/reservation/reservation-models';

export interface SearchQuery { // TODO: move somewhere else
  filter: RideSearchFilter;
  value: string;
}

export interface createRideData {
  startingPoint: string;
  destination: string;
  startTime: string;
  endTime: string;
  price: string;
  driverId: string;
  maxPassengers: number;
  date: string;
}

export interface updateRideData {
  startingPoint: string;
  destination: string;
  startTime: string;
  endTime: string;
  price: string;
  driverId: string;
  maxPassengers: number;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class RideProviderService {

  constructor(
    private _http: HttpClient,
    private _authenticationService: AuthenticationService
  ) { }

  private readonly apiUrl = "http://localhost:8080/api/rides";

  public getAllRides(): Observable<Ride[]> {
    return this._http.get<Ride[]>(`${this.apiUrl}`)
      .pipe(map(deepObjSnakeToCamelCase));
  }

  public getRideById(id: string): Observable<Ride> {
    return this._http.get<Ride>(`${this.apiUrl}/${id}`)
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

    return this._http.get<Ride[]>(`${this.apiUrl}/search?${searchQuery}`)
      .pipe(map(deepObjSnakeToCamelCase));
  }

  public createRide(formData: createRideData): Observable<Ride> {
    const { startingPoint, destination, maxPassengers } = formData;
    const userId = this._authenticationService.getUserId();

    return this._http.post<Ride>(`${this.apiUrl}`, {
      starting_point: startingPoint,
      destination: destination,
      driver_id: userId,
      max_passengers: maxPassengers
    })
      .pipe(map(deepObjSnakeToCamelCase));
  }

  public updateRide(id: string, updatedData: Partial<updateRideData>): Observable<Ride> {
    return this._http.put<Ride>(`${this.apiUrl}/${id}`, {
      starting_point: updatedData.startingPoint,
      destination: updatedData.destination,
      max_passengers: updatedData.maxPassengers
    })
      .pipe(map(deepObjSnakeToCamelCase));
  }

  public deleteRide(id: string): Observable<void> {
    return this._http.delete<void>(`${this.apiUrl}/${id}`);
  }

  public getRideReservations(id: string): Observable<Reservation[]> {
    return this._http.get<Reservation[]>(`${this.apiUrl}/${id}/reservations`)
      .pipe(map((res) => deepObjSnakeToCamelCase(res)));
  }
}
