import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders,HttpParams  } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DarkskyService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getDarkskyInfo(lat :number ,lon: number): Observable<any> {

    let headers = new HttpHeaders()
 
    headers=headers.set('Access-Control-Allow-Origin', '*');
    headers=headers.append('Sec-Fetch-Dest', 'script')

    headers=headers.set('Sec-Fetch-Mode', 'no-cors')
    headers=headers.append('Sec-Fetch-Site', 'none')

    
    return this.httpClient.jsonp("https://api.darksky.net/forecast/b57dedae1a629adbc8fbba39e9d35146/" + lat + "," + lon + "?units=auto",'callback')
  }

}
