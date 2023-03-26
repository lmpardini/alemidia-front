import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  protected urlApi: string = environment.alemidia_api;

  constructor(private http: HttpClient) { }

  public list(filtro: string | null | undefined): Observable<any> {
    const url = `${this.urlApi}/admin/colaboradores?filtro=${filtro}`
    return this.http.get<any>(url);
  }

  public listById(id:number): Observable<any> {
    const url = `${this.urlApi}/admin/colaborador/${id}`
    return this.http.get<any>(url);
  }

  public store(colaborador:any): Observable<any> {
    const url = `${this.urlApi}/admin/colaborador/`;
    return this.http.post<any>(url, colaborador);
  }

  public update(id:number,colaborador:any): Observable<any> {
    const url = `${this.urlApi}/admin/colaborador/${id}`;
    return this.http.put<any>(url, colaborador);
  }

  public getFuncoes() {
    const url = `${this.urlApi}/admin/colaborador-funcao`
    return this.http.get<any>(url);
  }

  public listVendedores(filtro: string | null | undefined): Observable<any> {
    const url = `${this.urlApi}/listar-vendedores?filtro=${filtro}`
    return this.http.get<any>(url);
  }
}
