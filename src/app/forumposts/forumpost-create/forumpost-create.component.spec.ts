import { ChangeDetectorRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatSnackBar,
  MatSnackBarModule,
  MatTabsModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { DOMHelper } from 'src/testing/dom-helper';
import { FunctionHelper } from 'src/testing/function.helper';

import { ForumpostCreateComponent } from './forumpost-create.component';

describe('ForumpostCreateComponent', () => {
  let component: ForumpostCreateComponent;
  let fixture: ComponentFixture<ForumpostCreateComponent>;
  let storeMock: any;
  let routerMock: any;
  let snackBarMock: any;
  let helper: FunctionHelper;
  let dh: DOMHelper<ForumpostCreateComponent>;

  beforeEach(async(() => {
    helper = new FunctionHelper();
    storeMock = jasmine.createSpyObj('Store', ['dispatch']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [ForumpostCreateComponent],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatTabsModule,
        MatMenuModule,
        MatSnackBarModule
      ],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: ActivatedRoute },
        { provide: MatSnackBar, useValue: snackBarMock },
        { provide: ChangeDetectorRef, useValue: ChangeDetectorRef },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumpostCreateComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper(fixture);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call create post once', () => {
    spyOn(component, 'post');
    dh.clickButton('Post');
    expect(component.post).toHaveBeenCalledTimes(1);
  });

  describe('clear', () => {
    it('should reset form and fileToUpload', () => {
      spyOn(component.PostForm, 'reset');
      component.fileToUpload = helper.getFileMock();
      component.clear();
      expect(component.PostForm.reset).toHaveBeenCalledTimes(1);
      expect(component.fileToUpload).toBe(null);
    });
  });

  describe('back', () => {
    it('should navigate to the previous page', () => {
      component.back();
      expect(routerMock.navigate).toHaveBeenCalledTimes(1);
    });
  });

  describe('setUploadFile', () => {
    it('should notify user if file is not an image', () => {
      const event = helper.getEventWithFile(false);
      component.setUploadFile(event);
      expect(snackBarMock.open).toHaveBeenCalledTimes(1);
    });

    it('should set upload file', () => {
      const event = helper.getEventWithFile(true);
      event.target.files[0] = helper.getFileMock();
      component.setUploadFile(event);
      expect(component.fileToUpload).toBe(event.target.files[0]);
    });
  });

  describe('post', () => {
    it('should notify user if there is no post title or the uploaded file is not an image', () => {
      component.fileToUpload = null;
      component.post();
      expect(snackBarMock.open).toHaveBeenCalledTimes(1);
    });

    it('should call store once', () => {
      component.PostForm.get('title').setValue('TestTitle');
      component.fileToUpload = helper.getFileMock();
      spyOn(component, 'back');
      component.post();
      expect(storeMock.dispatch).toHaveBeenCalledTimes(1);
    });

    it('should call back after calling store', () => {
      component.PostForm.get('title').setValue('TestTitle');
      component.fileToUpload = helper.getFileMock();
      spyOn(component, 'back');
      component.post();
      expect(component.back).toHaveBeenCalled();
    });
  });

});
