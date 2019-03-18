import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { UserService } from '../shared/user.service';
import { Observable, of } from 'rxjs';
import { User } from '../shared/user.model';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      imports: [
        ImageCropperModule,
      ],
      providers: [
        { provide: UserService, useValue: new USMock() },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have currentUser defined', () => {
    expect(component.currentUser).toBeDefined();
    expect(component.currentUser.username).toBe('testUser');
  });
  
});

class USMock {
  getProfileImage(): Observable<User> {
    return of(
      {
        id: 'fuiwehfvsdhgfoew',
        username: 'testUser',
        regDate: new Date(Date.now()).toISOString(),
        profilePicUrl: 'http://www.visitfranklinsouthamptonva.com/media/95251/testing.jpg'
      }
    );
  }
}
