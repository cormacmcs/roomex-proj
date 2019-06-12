import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  get(url: string): Observable<any> {
    return this.httpClient
      .get(url, {
        observe: 'response'
      })
      .pipe(
        map((res: HttpResponse<any>) => res.body.Search),
        catchError((e: HttpErrorResponse) => throwError(e))
      );
  }
}
