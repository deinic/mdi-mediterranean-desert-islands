import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DarkskyService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getDarkskyInfo(lat :number ,lon: number): Observable<any> {
    return this.httpClient.get("https://api.darksky.net/forecast/b57dedae1a629adbc8fbba39e9d35146/" + lat + "," + lon + "?units=auto")
  }

}
