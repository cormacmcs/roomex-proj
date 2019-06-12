import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UserFormComponent } from './user-form.component';
import { UserFormService } from './user-form.service';
import { UserFormConfig } from './user-form.config';
import { ValidatorsService } from '../../services/validators.service';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  const validatorsService: ValidatorsService = new ValidatorsService();

  beforeEach(async(() => {
    const userFormSpy = jasmine.createSpyObj('UserFormService', [
      'movieExists',
      'getMovies'
    ]);
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatAutocompleteModule
      ],
      declarations: [UserFormComponent],
      providers: [
        UserFormConfig,
        {
          provide: ValidatorsService,
          useValue: validatorsService
        },
        {
          provide: UserFormService,
          useValue: userFormSpy
        },
        { provide: FormBuilder, useValue: formBuilder }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    component.form = component.instantiateForm(formBuilder, validatorsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form validity', () => {
    describe('form', () => {
      it('form invalid when empty', () => {
        expect(component.form.valid).toBeFalsy();
      });
      it('form valid when firstName & lastName, entered & country="Ireland"', () => {
        component.form.controls.firstName.setValue('test');
        component.form.controls.lastName.setValue('test');
        component.form.controls.country.setValue('Ireland');
        fixture.detectChanges();
        expect(component.form.valid).toBeTruthy();
      });
    });

    describe('title', () => {
      it('title is valid by default', () => {
        expect(component.form.get('title').value).toBeTruthy();
      });

      it('title is "Mr." by default', () => {
        expect(component.form.get('title').value).toBe('Mr.');
      });
    });

    describe('firstName', () => {
      it('firstName is invalid by default', () => {
        expect(component.form.get('firstName').value).toBeFalsy();
      });
      it('firstName to be empty by default', () => {
        expect(component.form.get('firstName').value).toBe('');
      });
      it('firstName is valid when it "abcde"', () => {
        component.form.controls.firstName.setValue('abcde');
        fixture.detectChanges();
        expect(component.form.get('firstName').valid).toBeTruthy();
      });
      it('firstName is not valid when it "12345"', () => {
        component.form.controls.firstName.setValue('12345');
        fixture.detectChanges();
        expect(component.form.get('firstName').valid).toBeFalsy();
      });
    });

    describe('lastName', () => {
      it('lastName is invalid by default', () => {
        expect(component.form.get('lastName').value).toBeFalsy();
      });

      it('lastName is disabled by default', () => {
        expect(component.form.get('lastName').enabled).toBeFalsy();
      });

      it('lastName is enabled when firstname has value', () => {
        component.form.controls.firstName.setValue('test');
        component.enableOrDisableControls(component.form);
        fixture.detectChanges();
        expect(component.form.get('lastName').enabled).toBeTruthy();
      });
      it('lastName is valid when it "abcde"', () => {
        component.form.controls.firstName.setValue('test');
        component.enableOrDisableControls(component.form);
        component.form.controls.lastName.setValue('abcde');
        fixture.detectChanges();
        expect(component.form.get('lastName').valid).toBeTruthy();
      });
      it('lastName is not valid when it "12345"', () => {
        component.form.controls.firstName.setValue('test');
        component.enableOrDisableControls(component.form);
        component.form.controls.lastName.setValue('12345');
        fixture.detectChanges();
        expect(component.form.get('lastName').valid).toBeFalsy();
      });
    });

    describe('userName', () => {
      it('userName is valid by default', () => {
        expect(component.form.get('userName').valid).toBeTruthy();
      });
      it('userName to be empty by default', () => {
        expect(component.form.get('userName').value).toBe('');
      });

      it('userName is valid when it "test@test.com"', () => {
        component.form.controls.userName.setValue('test@test.com');
        fixture.detectChanges();
        expect(component.form.get('userName').valid).toBeTruthy();
      });
      it('userName is not valid when it "test@test."', () => {
        component.form.controls.userName.setValue('test@test.');
        fixture.detectChanges();
        expect(component.form.get('userName').valid).toBeFalsy();
      });
      it('userName is valid when it "abcde"', () => {
        component.form.controls.userName.setValue('abcde');
        fixture.detectChanges();
        expect(component.form.get('userName').valid).toBeTruthy();
      });
      it('userName is not valid when it "abc"', () => {
        component.form.controls.userName.setValue('abc');
        fixture.detectChanges();
        expect(component.form.get('userName').valid).toBeFalsy();
      });
    });

    describe('favouriteMovie', () => {
      it('favouriteMovie is valid by default', () => {
        expect(component.form.get('favouriteMovie').valid).toBeTruthy();
      });
      it('favouriteMovie to be empty by default', () => {
        expect(component.form.get('favouriteMovie').value).toBe('');
      });
    });

    describe('country', () => {
      it('country is invalid by default', () => {
        expect(component.form.get('country').valid).toBeFalsy();
      });
      it('country to be empty by default', () => {
        expect(component.form.get('country').value).toBe('');
      });
    });

    describe('postCode', () => {
      it('postCode is valid by default', () => {
        expect(component.form.get('postCode').valid).toBeTruthy();
      });
      it('postCode to be empty by default', () => {
        expect(component.form.get('postCode').value).toBe('');
      });

      it('postCode is invalid by default when country = "United Kingdom"', () => {
        component.form.controls.country.setValue('United Kingdom');
        fixture.detectChanges();
        expect(component.form.get('postCode').valid).toBeFalsy();
      });
    });
  });
});
