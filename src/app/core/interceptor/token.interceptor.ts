import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse

} from '@angular/common/http';
import { throwError, map, Observable } from 'rxjs';
import { StorageKeys } from "../interfaces/storage-keys";
import { catchError, filter, take, switchMap } from "rxjs/operators";
import { ErrorService } from "../services/error.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private errorService: ErrorService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: string | null = window.localStorage.getItem(StorageKeys.AUTH_TOKEN);

    if (token) {
      request = request.clone({
        setHeaders: {
          'Authorization': 'Bearer '+ token,
        }
      });
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if(error.status === 401) this.errorService.naoAutenticado(error);
        if(error.status === 422) { this.errorService.erroFormInvalid(error.error); }
        // if(![200, 422, 401].includes(error.status)) { this.errorService.erroGenerico(error.error?.mensagem || error.error?.message); }
        return throwError(error);
      }));

  }
}
