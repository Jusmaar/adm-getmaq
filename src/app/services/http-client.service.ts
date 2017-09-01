import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class HttpClient {

  constructor(
    private http: Http
  ) { }

  createAuthorizationHeader(headers: Headers): RequestOptions {
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    return options;
  }

  get(url: string): Observable<Response> {
    // const headers = new Headers();
    return this.http.get(url);
  }

  post(url: string, data: string): Observable<Response> {
    const headers = new Headers();
    const options = this.createAuthorizationHeader(headers);
    return this.http.post(url, data, options);
  }

  delete(url: string): Observable<Response> {
    // const headers = new Headers();
    return this.http.delete(url);
  }

  put(url: string, data: string): Observable<Response> {
    const headers = new Headers();
    const options = this.createAuthorizationHeader(headers);
    return this.http.put(url, data, options);
  }

}
