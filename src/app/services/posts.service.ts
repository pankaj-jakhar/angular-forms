import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, tap } from 'rxjs';
import { ApiService, IApiParams } from './service';
import { CacheService } from './cache.service';

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
  rawData$ = new BehaviorSubject<Posts[]>([]);
  error$ = new BehaviorSubject<HttpErrorResponse | null>(null);
  loading$ = new BehaviorSubject<boolean>(false);
  filterData$ = new BehaviorSubject<string>('');

  constructor(
    public override http: HttpClient,
    public override cache: CacheService
  ) {
    super(http, cache);
    this.initializeFilter();
  }

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
            this.data$.next(data);
            this.rawData$.next(data);
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

  initializeFilter() {
    combineLatest([this.rawData$, this.filterData$])
      .pipe(
        map(([rawData, filterString]) => {
          return rawData.filter(
            (post) =>
              post.title.includes(filterString) ||
              post.body.includes(filterString)
          );
        })
      )
      .subscribe((filteredData) => {
        this.data$.next(filteredData);
      });
  }
}
