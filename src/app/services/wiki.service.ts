import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WikiService {


  

  constructor(
    private httpClient: HttpClient
  ) { }


  public getwikiInfo(wiki_title :string ,wiki_lang: string): Observable<any> {
    return this.httpClient.get("https://"+wiki_lang+".wikipedia.org/w/api.php?action=query&format=json&titles="+wiki_title+"&formatversion=2&prop=imageinfo|pageimages|extracts&exsentences=5&exintro&explaintext&iiprop=url&piprop=original|thumbnail&pithumbsize=900")
  }
}



