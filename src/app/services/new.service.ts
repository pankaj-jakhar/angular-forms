import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewService {

  constructor(
    private http: HttpClient
  ) { }


  getData(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/todos/1').pipe(shareReplay(1));
  }
}
