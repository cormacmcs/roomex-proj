import { TestBed } from '@angular/core/testing';
import { ApiService } from '../../services/api.service';
import { UserFormService } from './user-form.service';

describe('UserFormService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ApiService,
          useValue: {
            get: jasmine.createSpy('get')
          }
        }
      ]
    })
  );

  it('should be created', () => {
    const service: UserFormService = TestBed.get(UserFormService);
    expect(service).toBeTruthy();
  });
});
