import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ApiService ]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUserData', () => {
    it('should return user data', () => {
      const testData = { login: 'abcd' };
      const username = 'abcd';

      service.getUserData(username).subscribe(data => {
        expect(data).toEqual(testData);
      });

      const req = httpMock.expectOne(`https://api.github.com/users/${username}`);
      expect(req.request.method).toBe('GET');
      req.flush(testData);
    });

    it('should handle errors', () => {
      const username = 'nonexistentuser';

      service.getUserData(username).subscribe(
        () => {},
        error => {
          expect(error.status).toBe(404);
        }
      );

      const req = httpMock.expectOne(`https://api.github.com/users/${username}`);
      expect(req.request.method).toBe('GET');
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });
  });
})

