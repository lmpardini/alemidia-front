import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  //private urlClientes = 'http://127.0.0.1:8000/api'
  private urlClientes = 'http://192.168.0.8:8000/api'
 // private urlClientes = 'http://177.83.186.254:8000/api'

  constructor(private http: HttpClient) { }

  public listClientes(filtro: string | null | undefined): Observable<any> {
    const url = `${this.urlClientes}/clientes/?filtro=${filtro}`
    return this.http.get<any>(url);
  }

  public listClientesbyId(id:number): Observable<any> {
    const url = `${this.urlClientes}/cliente/${id}`
    return this.http.get<any>(url);
  }

  public addCliente(cliente:any): Observable<any> {
    const url = `${this.urlClientes}/cliente/`;
    return this.http.post<any>(url, cliente);
  }

  public editCliente(id:number,cliente:any): Observable<any> {
    const url = `${this.urlClientes}/cliente/${id}`;
    return this.http.put<any>(url, cliente);
  }
}
