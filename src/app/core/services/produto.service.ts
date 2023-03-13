import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  protected urlApi: string = environment.alemidia_api;

  constructor(private http: HttpClient) { }

  public list(filtro: string | null | undefined): Observable<any> {
    const url = `${this.urlApi}/admin/produtos?filtro=${filtro}`
    return this.http.get<any>(url);
  }

  public listById(id:number): Observable<any> {
    const url = `${this.urlApi}/admin/produto/${id}`
    return this.http.get<any>(url);
  }

  public store(produto:any): Observable<any> {
    const url = `${this.urlApi}/admin/produto`;
    return this.http.post<any>(url, produto);
  }

  public update(id:number,produto:any): Observable<any> {
    const url = `${this.urlApi}/admin/produto/${id}`;
    return this.http.put<any>(url, produto);
  }
}
