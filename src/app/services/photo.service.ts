import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public getPhotos(id:number): Observable<any> {
    return this.httpClient.get('https://maps.nicoladeinnocentis.it:8085/getPhotos/'+id)
  }

  constructor(
    private httpClient:HttpClient
  ) { }
}
