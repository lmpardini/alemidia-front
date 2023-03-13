import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, tap, throwError } from "rxjs";
import { StorageKeys } from "../interfaces/storage-keys";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  protected urlApi: string = environment.alemidia_api;

  constructor(private http: HttpClient) { }

  public login(login:any): Observable<any> {
    const url = `${this.urlApi}/auth/login`
    return this.http.post<any>(url, login).pipe(
      map(res => res['data']),
      tap(res => {
        this.setAuthState({token: res.token, userName: res.user.nome, user: res.user.usuario, email: res.user.email, roleAccess: res.user.regra_acesso});
      }),
      catchError(error => {
        this.setAuthState({token: '', userName: '', user: '', email: '', roleAccess: ''})
        return throwError(error);
      })
    );
  }

  public isLogged(): Observable<any> {
    const url = `${this.urlApi}/auth/logged`
    return this.http.get<any>(url).pipe(
      map(res => res['data']),
      tap(res => {
        //this.setAuthState({token: res.token, userName: res.user.nome, user: res.user.usuario, email: res.user.email, roleAccess: res.user.regra_acesso});
      }),
      catchError(error => {
        this.setAuthState({token: '', userName: '', user: '', email: '', roleAccess: ''})
        return throwError(error);
      })
    );
  }

  public logout() :Observable<any> {
    const url = `${this.urlApi}/auth/logout`
    return this.http.get<any>(url).pipe(
      map(res => res),
      tap(res => {
        this.setAuthState({token: '', userName: '', user: '', email: '', roleAccess: ''})
      }),
      catchError(error => {
        this.setAuthState({token: '', userName: '', user: '', email: '', roleAccess: ''})
        return throwError(error);
      })
    );

  }

  public trocarSenha(form:any) : Observable<any> {
    const url = `${this.urlApi}/auth/trocar-senha`;
    return this.http.put<any>(url, form);
  }

  private setAuthState(authData: {token:string, userName:string, user: string, email:string, roleAccess:string}) {
    window.localStorage.setItem(StorageKeys.AUTH_TOKEN, authData.token);
    window.localStorage.setItem(StorageKeys.AUTH_USER_NAME, authData.userName);
    window.localStorage.setItem(StorageKeys.AUTH_USERNAME, authData.user);
    window.localStorage.setItem(StorageKeys.AUTH_USER_EMAIL, authData.email);
    window.localStorage.setItem(StorageKeys.AUTH_ROLE_ACCESS, authData.roleAccess);
  }
}
