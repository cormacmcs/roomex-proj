import { Injectable } from '@angular/core';
import { UserForm } from './user-form/user-form.service';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  formResults: UserForm;
  constructor() {}

  setFormResults(formValue: UserForm) {
    this.formResults = formValue;
  }

  getFormResults() {
    return this.formResults;
  }
}
