import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingSubject = new BehaviorSubject<any>(false)

  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  public hide(): void {
   setTimeout(() => {
     this.loadingSubject.next(false);
    },800)
  }

  public show(): void {
    this.loadingSubject.next(true)
  }
}
