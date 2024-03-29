import { Injectable } from '@angular/core';
import { environment } from "../../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CondicaoPagamentoService {

  protected urlApi: string = environment.alemidia_api;

  constructor(private http: HttpClient) { }

  public list(filtro: string | null | undefined): Observable<any> {
    const url = `${this.urlApi}/admin/pagamento/condicoes?filtro=${filtro}`
    return this.http.get<any>(url);
  }

  public listById(id:number): Observable<any> {
    const url = `${this.urlApi}/admin/pagamento/condicao/${id}`
    return this.http.get<any>(url);
  }

  public store(produto:any): Observable<any> {
    const url = `${this.urlApi}/admin/pagamento/condicao`;
    return this.http.post<any>(url, produto);
  }

  public update(id:number,produto:any): Observable<any> {
    const url = `${this.urlApi}/admin/pagamento/condicao/${id}`;
    return this.http.put<any>(url, produto);
  }

  public listActive(): Observable<any> {
    const url = `${this.urlApi}/listar-condicao-pagamento`
    return this.http.get<any>(url);
  }
}
