import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/* const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
    'Content-Type': 'application/json; charset=utf-8'
  })
}; */

@Injectable({
  providedIn: 'root'
})
export class WikiService {


  

  constructor(
    private httpClient: HttpClient
  ) { }

  

  public getwikiInfo(wiki_title :string ,wiki_lang: string): Observable<any> {
    let headers = new HttpHeaders()
 
    /* headers=headers.append('Access-Control-Allow-Origin', 'https://maps.nicoladeinnocentis.it') */
    /* headers=headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT') */
    /* headers=headers.append('Access-Control-Allow-Headers', 'Content-Type') 
    headers=headers.append('Sec-Fetch-Mode', 'no-cors')
    headers=headers.append('Referer', '"https://"'+wiki_lang+'".wikipedia.org')*/


 

    return this.httpClient.get("https://"+wiki_lang+".wikipedia.org/w/api.php?action=query&format=json&titles="+wiki_title+"&formatversion=2&prop=imageinfo|pageimages|extracts&exsentences=5&exintro&explaintext&iiprop=url&piprop=original|thumbnail&pithumbsize=900&origin=*",{ headers: headers })
  }
}



