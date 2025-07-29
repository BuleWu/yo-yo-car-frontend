import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Reservation} from '../../../../shared/models/reservation/reservation-models';
import {deepObjSnakeToCamelCase} from '../../../../common/generic/utils/data-manipulation/deep-obj-snake-to-camel-case';
import {ReservationStatusesEnum} from '../../enums/enum';

export interface createReservationData {
  userId: string;
  rideId: string;
}

export interface updateReservationData {
  status: ReservationStatusesEnum;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationProviderService {

  private readonly apiUrl = 'http://localhost:8080/api/reservations';

  constructor(
    private _http: HttpClient
  ) { }

  public getAllReservations(): Observable<Reservation[]> {
    return this._http.get(`${this.apiUrl}`)
      .pipe(map(deepObjSnakeToCamelCase))
  }

  public getReservationById(id: string): Observable<Reservation> {
    return this._http.get<Reservation>(`${this.apiUrl}/${id}`)
      .pipe(map(deepObjSnakeToCamelCase));
  }

  public createReservation(payload: createReservationData): Observable<Reservation> {
    return this._http.post<Reservation>(`${this.apiUrl}`, payload)
      .pipe(map(deepObjSnakeToCamelCase));
  }

  public updateReservation(id: string, payload: updateReservationData): Observable<Reservation> {
    return this._http.put<Reservation>(`${this.apiUrl}/${id}`, payload)
      .pipe(map(deepObjSnakeToCamelCase));
  }

  public deleteReservation(id: string): Observable<void> {
    return this._http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
