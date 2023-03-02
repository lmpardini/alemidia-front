import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BuscaCepService {

  private urlClientes = 'http://127.0.0.1:8000/api'
  //private urlClientes = 'http://192.168.0.8:8000/api'
  //private urlClientes = 'http://177.83.186.254:8000/api'

  constructor(private http: HttpClient) { }

  public buscaCep(cep: number| null | undefined): Observable<any> {
    const url = `${this.urlClientes}/busca-cep?cep=${cep}`
    return this.http.get<any>(url);
  }
}
