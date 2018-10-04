import { Injectable } from '@angular/core';
declare var toastr: any
@Injectable()
export class TosterService {

  constructor() { }
  success(title: string, message?: string) {
    toastr.success(title, message);
  }
  warning(title: string, message?: string) {
    toastr.warning(title, message);
  }
  error(title: string, message?: string) {
    toastr.error(title, message);
  }
}
