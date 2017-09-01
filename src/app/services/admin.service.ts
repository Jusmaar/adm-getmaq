import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from './http-client.service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminService {

  constructor(
    private http: HttpClient
  ) { }

  login(ruta: string, obj: any): Observable<any> {
    let data = JSON.stringify(obj);
    return this.http.post(ruta, data)
      .map((res: Response) => {
        const data1 = res.json();
        return data1;
      }).catch((err: Response | any) => {
        console.log('err : ', err);
        let errmsg: string;
        if (err instanceof Response) {
          errmsg = 'Email o contraseña incorrectos';
        }
        return Observable.throw(errmsg);
      });
  }

  loggedIn(): boolean {
    if (localStorage.getItem('client')) {
      return true;
    } else {
      return false;
    }
  }

   set(obj: any): void {
      localStorage.setItem('client', JSON.stringify(obj));
  }

}
