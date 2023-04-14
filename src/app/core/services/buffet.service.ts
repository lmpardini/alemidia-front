import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Buffet } from "../interfaces/buffet";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BuffetService {

  protected urlApi: string = environment.alemidia_api;

  constructor(private http: HttpClient) { }

  public listBuffet(filtro: string | null | undefined): Observable<any> {
    const url = `${this.urlApi}/buffets/?filtro=${filtro}`
    return this.http.get<any>(url);
  }

  public listActive(filtro: string | null | undefined): Observable<any> {
    const url = `${this.urlApi}/buffets-ativos?filtro=${filtro}`
    return this.http.get<any>(url);
  }

  public listBuffetById(id:number): Observable<any> {
    const url = `${this.urlApi}/buffet/${id}`
    return this.http.get<any>(url);
  }

  public addBuffet(buffet:any): Observable<any> {
    const url = `${this.urlApi}/buffet/`;
    return this.http.post<any>(url, buffet);
  }

  public editBuffet(id:number,cliente:any): Observable<any> {
    const url = `${this.urlApi}/buffet/${id}`;
    return this.http.put<any>(url, cliente);
  }
}
