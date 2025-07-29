import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Reservation} from '../../../../shared/models/reservation/reservation-models';

@Injectable({
  providedIn: 'root'
})
export class ReservationProviderService {

  private readonly apiUrl = 'http://localhost:8080/api/reservations';

  constructor(
    private _http: HttpClient
  ) { }

  public getAllReservations(): Observable<Reservation> {

  }
}
