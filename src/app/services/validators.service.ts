import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { UserFormService } from '../home/user-form/user-form.service';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  constructor() {}

  usernameIsEmailValidator(emailValidator: ValidatorFn) {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value.indexOf('@') >= 0) {
        return emailValidator(control);
      }
      return null;
    };
  }

  movieValidator(userFormService: UserFormService) {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value) {
        return userFormService.movieExists(control.value)
          ? null
          : { movie: true };
      }
      return null;
    };
  }

  ukPostcodeValidator(patternValidator: ValidatorFn) {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.parent) {
        const country = control.parent.value.country;
        if (country === 'United Kingdom') {
          return patternValidator(control);
        }
      }
      return null;
    };
  }

  ukRequiredValidator(requiredValidator: ValidatorFn) {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.parent) {
        const country = control.parent.value.country;
        if (country === 'United Kingdom') {
          return requiredValidator(control);
        }
      }
      return null;
    };
  }
}
