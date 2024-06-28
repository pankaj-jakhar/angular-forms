import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { ApiService, IApiParams } from './service';

interface Posts {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostsService extends ApiService {
  data$ = new BehaviorSubject<Posts[]>([]);
  error$ = new BehaviorSubject<HttpErrorResponse | null>(null);
  loading$ = new BehaviorSubject<boolean>(false);

  getData() {
    this.loading$.next(true);
    const params: IApiParams = {
      path: 'https://jsonplaceholder.typicode.com/posts',
      method: 'GET',
    };

    this.cacheRequest<Posts[]>(params)
      .pipe(
        tap({
          next: (data) => {
            this.data$.next([...this.data$.getValue(), ...data]);
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
