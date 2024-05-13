import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { of, throwError } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['getUserData', 'getResult']);
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientModule],
      providers: [{ provide: ApiService, useValue: apiServiceSpy }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user data and repos when calling GetUserInfo', () => {
    const userData:any = {
      bio: null,
      githubURL: "https://api.github.com/users/abcd",
      location: null,
      name: null,
      profileURL: "https://avatars.githubusercontent.com/u/58120?v=4",
      repoURL: "https://api.github.com/users/abcd/repos",
      twitterURL: "https://twitter.com/null"
    };

    const repoData:any[] = [ 
      {
        description: "A base rails app featuring: RESTful Authentication, Will Paginate, Rspec &amp; Rspec-rails, Exception Notifier, Asset Packager, Cap Recipe (multi-stage). Put together by Fudge to remove the need for boring project setup.",
        name: "bort",
        tags: []
      }
     ];
    apiServiceSpy.getUserData.and.returnValue(of(userData));
    apiServiceSpy.getResult.and.returnValue(of(repoData));

    component.GetUserInfo('abcd');

    expect(apiServiceSpy.getUserData).toHaveBeenCalledWith('abcd');
    expect(apiServiceSpy.getResult).toHaveBeenCalledWith(userData.repoURL);
  });

  it('should handle error when fetching user data', () => {
    apiServiceSpy.getUserData.and.returnValue(throwError(()=> new Error('Error')));

    component.GetUserInfo('abcd');

    expect(component.user_exist).toBeFalsy();
  });
});