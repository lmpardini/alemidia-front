import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AssessoriaService {

  //private urlApi = 'http://127.0.0.1:8000/api'
  //private urlApi = 'http://192.168.0.8:8000/api'
  private urlApi = 'http://177.83.186.254:8000/api'

  constructor(private http: HttpClient) { }

  public listAssessoria(filtro: string | null | undefined): Observable<any> {
    const url = `${this.urlApi}/assessorias/?filtro=${filtro}`
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
