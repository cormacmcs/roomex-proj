import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { UserFormConfig } from './user-form.config';
import { ValidatorsService } from '../../services/validators.service';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserFormService } from './user-form.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  providers: [UserFormConfig]
})
export class UserFormComponent implements OnInit, OnDestroy {
  @Output()
  formSubmit: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;
  subscriptions: Array<Subscription> = [];
  constructor(
    private formBuilder: FormBuilder,
    public config: UserFormConfig,
    private validatorsService: ValidatorsService,
    public userFormService: UserFormService
  ) {}

  ngOnInit() {
    this.form = this.instantiateForm(this.formBuilder, this.validatorsService);
    this.subscriptions.push(
      this.form.valueChanges
        .pipe(tap(e => this.enableOrDisableControls(this.form)))
        .subscribe(),
      this.form
        .get('country')
        .valueChanges.pipe(
          tap(e => {
            this.form.get('postCode').reset();
            this.form.get('postCode').markAsDirty();
            this.form.get('postCode').updateValueAndValidity();
          })
        )
        .subscribe(),
      this.form
        .get('favouriteMovie')
        .valueChanges.pipe(tap(e => this.userFormService.getMovies(e)))
        .subscribe()
    );
    this.enableOrDisableControls(this.form);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(e => e.unsubscribe());
  }

  public instantiateForm(
    formBuilder: FormBuilder,
    validatorsService: ValidatorsService
  ): FormGroup {
    return formBuilder.group({
      title: [this.config.titles[0]],
      firstName: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z -\']+')]
      ],
      lastName: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z -\']+')]
      ],
      userName: [
        '',
        [
          Validators.minLength(5),
          validatorsService.usernameIsEmailValidator(Validators.email)
        ]
      ],
      favouriteMovie: [
        '',
        validatorsService.movieValidator(this.userFormService)
      ],
      country: ['', Validators.required],
      postCode: [
        '',
        [
          validatorsService.ukPostcodeValidator(
            Validators.pattern(
              '^[A-Za-z]{1,2}[09Rr][0-9A-Za-z]? [0-9][ABD-HJLNP-UW-Zabdhjlnp-uw-z]{2}$'
            )
          ),
          validatorsService.ukRequiredValidator(Validators.required),
          Validators.minLength(6),
          Validators.maxLength(10)
        ]
      ]
    });
  }

  public enableOrDisableControls(form: FormGroup): void {
    const firstName = form.get('firstName').value;
    if (!firstName) {
      this.toggle(form, 'lastName', false);
    } else {
      this.toggle(form, 'lastName', true);
    }
  }

  private toggle(
    form: FormGroup,
    controlName: string,
    shouldEnable: boolean
  ): void {
    const control = form.controls[controlName];
    if (shouldEnable) {
      if (control.disabled) {
        control.enable();
      }
    } else {
      if (control.enabled) {
        control.disable();
        control.reset();
      }
    }
  }

  public hasError(controlName: string, errorName: string): boolean {
    return this.form.controls[controlName].hasError(errorName);
  }

  public validateSubmit(ev: Event): void {
    if (this.form.valid) {
      ev.preventDefault();
      this.formSubmit.next(this.form.value);
    }
  }
}
