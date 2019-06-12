import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeService } from '../home/home.service';
import { ThankYouComponent } from './thank-you.component';

describe('ThankYouComponent', () => {
  let component: ThankYouComponent;
  let fixture: ComponentFixture<ThankYouComponent>;
  const homeSpy = jasmine.createSpyObj('HomeService', [
    'setFormResults',
    'getFormResults'
  ]);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ThankYouComponent],
      providers: [
        {
          provide: HomeService,
          useValue: homeSpy
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThankYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
