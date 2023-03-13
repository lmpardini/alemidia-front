import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  protected urlApi: string = environment.alemidia_api;

  constructor(private http: HttpClient) { }

  public listUsers(filtro: string | null | undefined): Observable<any> {
    const url = `${this.urlApi}/admin/usuarios/?filtro=${filtro}`
    return this.http.get<any>(url);
  }

  public listById(id:number): Observable<any> {
    const url = `${this.urlApi}/admin/usuario/${id}`
    return this.http.get<any>(url);
  }

  public add(form:any): Observable<any> {
    const url = `${this.urlApi}/admin/usuario`;
    return this.http.post<any>(url, form);
  }

  public update(id:number,form:any): Observable<any> {
    const url = `${this.urlApi}/admin/usuario/${id}`;
    return this.http.put<any>(url, form);
  }

  public redefinirSenha(id:number,form:any): Observable<any> {
    const url = `${this.urlApi}/admin/usuario-redefinir-senha/${id}`;
    return this.http.put<any>(url, form);
  }

  public listPerfilUsuario(): Observable<any>{
    const url = `${this.urlApi}/admin/roles`
    return this.http.get<any>(url);
  }
}
