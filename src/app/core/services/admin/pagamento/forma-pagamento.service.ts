import { Injectable } from '@angular/core';
import { environment } from "../../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FormaPagamentoService {

  protected urlApi: string = environment.alemidia_api;

  constructor(private http: HttpClient) { }

  public list(filtro: string | null | undefined): Observable<any> {
    const url = `${this.urlApi}/admin/pagamento/formas?filtro=${filtro}`
    return this.http.get<any>(url);
  }

  public listById(id:number): Observable<any> {
    const url = `${this.urlApi}/admin/pagamento/forma/${id}`
    return this.http.get<any>(url);
  }

  public store(produto:any): Observable<any> {
    const url = `${this.urlApi}/admin/pagamento/forma`;
    return this.http.post<any>(url, produto);
  }

  public update(id:number,produto:any): Observable<any> {
    const url = `${this.urlApi}/admin/pagamento/forma/${id}`;
    return this.http.put<any>(url, produto);
  }
}
