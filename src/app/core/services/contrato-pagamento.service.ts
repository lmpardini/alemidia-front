import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ContratoPagamentoService {

  protected urlApi: string = environment.alemidia_api;
  constructor(private http: HttpClient) { }

  public list(params?:any): Observable<any> {
    const url = `${this.urlApi}/admin/listar-pagamentos`
    return this.http.get<any>(url, {params});
  }

  public update(paramns:any): Observable<any> {
    const url = `${this.urlApi}/admin/quitar-pagamento`;
    return this.http.put<any>(url, paramns);
  }
}
