import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DOMHelper } from 'src/testing/dom-helper';
import { FunctionHelper } from 'src/testing/function.helper';

import { UserService } from '../shared/user.service';
import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let userServiceMock: any;
  let snackBarMock: any;
  let helper: FunctionHelper;
  let dh: DOMHelper<UserProfileComponent>;

  beforeEach(async(() => {
    helper = new FunctionHelper();
    userServiceMock = jasmine.createSpyObj('UserService', ['uploadProfileImage', 'getUserWithProfilePic']);
    snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      imports: [
        ImageCropperModule,
        ReactiveFormsModule,
        MatSnackBarModule
      ],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: MatSnackBar, useValue: snackBarMock },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    userServiceMock.getUserWithProfilePic.and.returnValue(helper.getUserWithProfilePicUrl());
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper(fixture);
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
    dh.clickButton('Save changes');
    expect(component.uploadFile).toHaveBeenCalledTimes(1);
  });

  describe('uploadFile', () => {
    it('should reset variables', () => {
      component.imageChangedEvent = helper.getEventWithFile(true);
      userServiceMock.uploadProfileImage.and.returnValue(helper.getFileMeta());
      component.uploadFile();
      expect(component.imageChangedEvent).toBe('');
      expect(component.croppedImage).toBe('');
      expect(component.fileToUpload).toBe(null);
      expect(snackBarMock.open).toHaveBeenCalledTimes(1);
    });
  });

  describe('setUploadFile', () => {
    it('should set variables', () => {
      const event = helper.getEventWithFile(true);
      component.setUploadFile(event);
      expect(component.fileToUpload).toBe(event.target.files[0]);
    });

    it('should call loadFile once', () => {
      const event = helper.getEventWithFile(true);
      spyOn(component, 'loadFile');
      component.setUploadFile(event);
      expect(component.loadFile).toHaveBeenCalledTimes(1);
    });

    it('should open snackbar if file is not an image', () => {
      const event = helper.getEventWithFile(false);
      component.setUploadFile(event);
      expect(snackBarMock.open).toHaveBeenCalledTimes(1);
    });
  });

  describe('imageCropped', () => {
    it('should set variables', () => {
      const event = helper.getEventWithFile(true);
      component.imageCropped(event);
      expect(component.croppedImage).toBe(event.base64);
      expect(component.croppedBlob).toBe(event.file);
    });
  });

});
