import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, tap } from 'rxjs';
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

  async getData() {
    console.log('data');
    this.loading$.next(true);
    const params: IApiParams = {
      path: 'https://jsonplaceholder.typicode.com/todos/1',
      method: 'GET',
    };
    try {
      const data = await firstValueFrom(this.cacheRequest<Todo>(params));
      this.data$.next(data);
    } catch (error) {
      this.error$.next(error as HttpErrorResponse);
    } finally {
      this.loading$.next(false);
    }
  }
}
