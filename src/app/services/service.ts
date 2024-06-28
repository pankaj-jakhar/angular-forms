import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CacheService } from './cache.service';

type FetchMethods = 'GET';

type UpdateMethods = 'POST' | 'PUT' | 'PATCH';

type DeleteMethods = 'DELETE';

export interface IApiParams {
  path: string;
  method: FetchMethods | UpdateMethods | DeleteMethods;
  query?: any;
  body?: any;
  noAuth?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(public http: HttpClient, public cache: CacheService) {}

  public cacheRequest<T>(params: IApiParams): Observable<T> {
    let key = JSON.stringify(params);
    return this.cache.get(key, () => this.request<T>(params));
  }

  public request<T>(params: IApiParams): Observable<T> {
    const { path, method, body, query } = params;
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
    return this.http.request<T>(method, `${path}`, {
      body,
      headers,
      params: query,
    });
  }
}
