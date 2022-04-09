import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {


  constructor(
    private httpClient: HttpClient
  ) { }

  public getMarker(): Observable<any> {
    return this.httpClient.get('https://raw.githubusercontent.com/deinic/fontanelle/main/fontanelle.json')

  }

  public getMarkerIslands(): Observable<any> {
    return this.httpClient.get('http://localhost:8085/getIslands')

  }
}
