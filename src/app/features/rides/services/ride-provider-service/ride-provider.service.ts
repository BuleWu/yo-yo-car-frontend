import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export interface SearchQuery {
  filter: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class RideProviderService {

  constructor(
    private _httpClient: HttpClient
  ) { }


  baseUrl = "http://localhost:8080";

  /*TODO: add ride model*/
  public searchRides(query: SearchQuery[]): Observable<any> {
    let searchQuery = '';
    query.forEach((search, index) => {
      if (index === 0) {
        searchQuery += `${search.filter}=${search.value}`;
      } else {
        searchQuery += `&${search.filter}=${search.value}`;
      }
    })

    return this._httpClient.get(`${this.baseUrl}/api/rides/search?${searchQuery}`);
  }
}
