import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AssessoriaService {

  protected urlApi: string = environment.alemidia_api;
  constructor(private http: HttpClient) { }

  public listAssessoria(filtro: string | null | undefined): Observable<any> {
    const url = `${this.urlApi}/assessorias/?filtro=${filtro}`
    return this.http.get<any>(url);
  }

  public listActive(filtro: string | null | undefined): Observable<any> {
    const url = `${this.urlApi}/assessorias-ativos?filtro=${filtro}`
    return this.http.get<any>(url);
  }

  public listAssessoriaById(id:number): Observable<any> {
    const url = `${this.urlApi}/assessoria/${id}`
    return this.http.get<any>(url);
  }

  public addAssessoria(assessoria:any): Observable<any> {
    const url = `${this.urlApi}/assessoria/`;
    return this.http.post<any>(url, assessoria);
  }

  public editAssessoria(id:number,cliente:any): Observable<any> {
    const url = `${this.urlApi}/assessoria/${id}`;
    return this.http.put<any>(url, cliente);
  }
}
