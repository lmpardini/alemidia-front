import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Buffet } from "../interfaces/buffet";

@Injectable({
  providedIn: 'root'
})
export class BuffetService {

  //private urlApi = 'http://127.0.0.1:8000/api'
  private urlApi = 'http://192.168.0.8:8000/api'
  // private urlApi = 'http://177.83.186.254:8000/api'

  constructor(private http: HttpClient) { }

  public listBuffet(filtro: string | null | undefined): Observable<any> {
    const url = `${this.urlApi}/buffets/?filtro=${filtro}`
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
