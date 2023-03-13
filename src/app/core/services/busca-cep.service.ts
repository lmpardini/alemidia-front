import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BuscaCepService {

  protected urlApi: string = environment.alemidia_api;

  constructor(private http: HttpClient) { }

  public buscaCep(cep: number| null | undefined): Observable<any> {
    const url = `${this.urlApi}/busca-cep?cep=${cep}`
    return this.http.get<any>(url);
  }
}
