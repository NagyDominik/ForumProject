import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';
import { ImageCropperModule } from 'ngx-image-cropper';
import { Observable, of } from 'rxjs';

import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { UserProfileComponent } from './user-profile.component';
import { By } from '@angular/platform-browser';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      imports: [
        ImageCropperModule,
        ReactiveFormsModule,
        MatSnackBarModule
      ],
      providers: [
        { provide: UserService, useValue: new USMock() },
        // { provide: Router, useValue: Router },
        // { provide: ActivatedRoute, useValue: ActivatedRoute },
        { provide: MatSnackBar, useValue: MatSnackBar },
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

  it('should call uploadFile once', () => {
    spyOn(component, 'uploadFile');
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    buttons.forEach(btn => {
      if (btn.nativeElement.textContent === 'Save') {
        btn.nativeElement.click();
      }
    });
    expect(component.uploadFile).toHaveBeenCalledTimes(1);
  });

});

class USMock {
  getUserWithProfilePic(): Observable<User> {
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
