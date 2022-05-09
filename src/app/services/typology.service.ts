import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypologyService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getTypologies(): Observable<any> {
    return this.httpClient.get('https://maps.nicoladeinnocentis.it:8085/getTypologies')

  }
}
