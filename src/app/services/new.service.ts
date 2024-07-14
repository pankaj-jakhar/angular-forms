import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { ApiService, IApiParams } from './service';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class NewService extends ApiService {
  data$ = new BehaviorSubject<Todo | null>(null);
  error$ = new BehaviorSubject<HttpErrorResponse | null>(null);
  loading$ = new BehaviorSubject<boolean>(false);

  getData() {
    console.log('data');
    this.loading$.next(true);
    const params: IApiParams = {
      path: 'https://jsonplaceholder.typicode.com/todos/1',
      method: 'GET',
    };

    this.cacheRequest<Todo>(params)
      .pipe(
        tap({
          next: (data) => {
            this.data$.next(data);
          },
          error: (error) => {
            this.error$.next(error);
          },
          complete: () => {
            this.loading$.next(false);
          },
        })
      )
      .subscribe();
  }
}
