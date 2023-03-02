import { Injectable } from '@angular/core';
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastr: ToastrService) { }

  public successMessage(message:string) {
    this.toastr.success(message);
  }

  public errorMessage(err:any) {
    if (err.status === 422) {
      Object.entries(err.error.errors).forEach( res => {
        // @ts-ignore
        this.toastr.error(res[1].toString());
      })
    }
    if (err.status === 400){
      this.toastr.error(err.error.message)
    }
  }
}
