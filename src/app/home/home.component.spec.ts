import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormComponent } from './user-form/user-form.component';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';
import { MockDirective } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const homeSpy = jasmine.createSpyObj('HomeService', [
    'setFormResults',
    'getFormResults'
  ]);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'thankyou', component: MockDirective(HomeComponent) }
        ])
      ],
      declarations: [HomeComponent, MockDirective(UserFormComponent)],
      providers: [
        {
          provide: HomeService,
          useValue: homeSpy
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
