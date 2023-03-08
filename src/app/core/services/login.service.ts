import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //private urlClientes = 'http://127.0.0.1:8000/api'
  //private urlClientes = 'http://192.168.0.8:8000/api'
  private urlClientes = 'http://177.83.186.254:8000/api'

  constructor(private http: HttpClient) { }

  public login(login:any): Observable<any> {
    const url = `${this.urlClientes}/auth/login`
    return this.http.post<any>(url, login);
  }
}
