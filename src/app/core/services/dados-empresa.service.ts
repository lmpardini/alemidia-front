import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DadosEmpresaService {

  protected urlApi: string = environment.alemidia_api;

  constructor(private http: HttpClient) { }

  public show(): Observable<any> {
    const url = `${this.urlApi}/admin/dados-empresa`
    return this.http.get<any>(url);
  }

  public edit(cliente:any): Observable<any> {
    const url = `${this.urlApi}/admin/dados-empresa`;
    return this.http.put<any>(url, cliente);
  }
}
