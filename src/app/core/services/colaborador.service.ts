import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {


  //private urlApi = 'http://127.0.0.1:8000/api'
  //private urlApi = 'http://192.168.0.8:8000/api'
  private urlApi = 'http://177.83.186.254:8000/api'

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
}
