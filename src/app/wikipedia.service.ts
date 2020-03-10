import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {pluck} from 'rxjs/operators';

export interface WikipediaResponse {
  query: {
    search: {
      title: string;
      snippet: string;
      pageid: number;
    }[];
  };
}
new Observable<WikipediaResponse>();
@Injectable({
  providedIn: 'root'
})
export class WikipediaService {

  constructor(private http: HttpClient) {


  }

  public search(term: string): Observable<WikipediaResponse[]> {
    return this.http.get<WikipediaResponse>('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        format: 'json',
        list: 'search',
        utf8: '1',
        srsearch: term,
        origin: '*',
      }
    })
      .pipe(pluck('query', 'search')
    );
  }
}
