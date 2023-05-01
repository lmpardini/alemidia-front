import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  protected urlApi: string = environment.alemidia_api;

  constructor(private http: HttpClient) { }

  public listClientes(params: any): Observable<any> {
    const url = `${this.urlApi}/clientes`
    return this.http.get<any>(url, {params});
  }

  public listActive(filtro: string | null | undefined): Observable<any> {
    const url = `${this.urlApi}/clientes-ativos?filtro=${filtro}`
    return this.http.get<any>(url);
  }

  public listClientesbyId(id:number): Observable<any> {
    const url = `${this.urlApi}/cliente/${id}`
    return this.http.get<any>(url);
  }

  public addCliente(cliente:any): Observable<any> {
    const url = `${this.urlApi}/cliente/`;
    return this.http.post<any>(url, cliente);
  }

  public editCliente(id:number,cliente:any): Observable<any> {
    const url = `${this.urlApi}/cliente/${id}`;
    return this.http.put<any>(url, cliente);
  }
}
