import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  protected urlApi: string = environment.alemidia_api;

  constructor(private http: HttpClient) { }

  public list(params?:any): Observable<any> {
    const url = `${this.urlApi}/contratos`
    return this.http.get<any>(url, {params});
  }

  public listById(id:number): Observable<any> {
    const url = `${this.urlApi}/contrato/${id}`
    return this.http.get<any>(url);
  }

  public store(contrato:any): Observable<any> {
    const url = `${this.urlApi}/contrato/`;
    return this.http.post<any>(url, contrato);
  }

  public update(id:number,contrato:any): Observable<any> {
    const url = `${this.urlApi}/contrato/${id}`;
    return this.http.put<any>(url, contrato);
  }

  public destroy(id:number): Observable<any> {
    const url = `${this.urlApi}/contrato/${id}`;
    return this.http.delete<any>(url);
  }
  public verificaDataProduto(params?:any): Observable<any> {
    const url = `${this.urlApi}/verifica-data-produto`
    return this.http.post<any>(url, params);
  }

  public imprimirContrato(id:number) {
    const url = `${this.urlApi}/donwload-contrato/${id}`
    this.http.get(url, {
      responseType: 'blob',
    }).subscribe((data: Blob) => {
      const downloadUrl = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'contrato.pdf';
      link.click();
    });
  }
}
