import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache = new Map<string, any>();

  constructor(private http: HttpClient) {}

  get<T>(cacheKey: string, fetchFunction: () => Observable<T>): Observable<T> {
    const cachedResponse = this.cache.get(cacheKey);
    if (cachedResponse) {
      return of(cachedResponse);
    }

    return fetchFunction().pipe(
      tap((response) => this.cache.set(cacheKey, response))
    );
  }

  clearCache() {
    this.cache.clear();
  }

  removeCacheEntry(cacheKey: string) {
    this.cache.delete(cacheKey);
  }

  getAllCache() {
    return this.cache;
  }
}
