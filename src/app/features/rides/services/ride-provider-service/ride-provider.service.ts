import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Ride} from '../../../../shared/models/ride/ride-models';
import {AuthenticationService} from '../../../auth/services/authentication.service';
import {deepObjSnakeToCamelCase} from '../../../../common/generic/utils/data-manipulation/deep-obj-snake-to-camel-case';
import {RideSearchFilter} from '../../../../ride-search-page/enums/enum';
import {Reservation} from '../../../../shared/models/reservation/reservation-models';
import {environment} from '../../../../../environments/environment.development';

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
  startingPoint?: string;
  destination?: string;
  startTime?: string;
  endTime?: string;
  price?: string;
  maxPassengers?: number;
  date?: string;
  finished?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RideProviderService {

  constructor(
    private _http: HttpClient,
  ) { }
  private readonly apiUrl = `${environment.baseUrl}/api/rides`;

  public getUserRides(userId: string): Observable<Ride[]> {
    return this._http.get<Ride[]>(`${environment.baseUrl}/api/user/${userId}/rides`)
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
    return this._http.post<Ride>(`${this.apiUrl}`, {
     ...formData
    })
      .pipe(map(deepObjSnakeToCamelCase));
  }

  public updateRide(id: string, formData: Partial<updateRideData>): Observable<Ride> {
    return this._http.put<Ride>(`${this.apiUrl}/${id}`, {
     ...formData
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

  public startRide(rideId: string): Observable<any> {
    return this._http.patch(`${this.apiUrl}/${rideId}/start`, null);
  }

  public finishRide(rideId: string): Observable<any> {
    return this._http.patch(`${this.apiUrl}/${rideId}/finish`, null);
  }

  public cancelRide(rideId: string): Observable<any> {
    return this._http.patch(`${this.apiUrl}/${rideId}/cancel`, null);
  }
}
