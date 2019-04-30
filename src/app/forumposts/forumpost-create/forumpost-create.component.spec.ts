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
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Forumpost } from '../shared/forumpost.model';
import { ForumpostCreateComponent } from './forumpost-create.component';
import { ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngxs/store';

describe('ForumpostCreateComponent', () => {
  let component: ForumpostCreateComponent;
  let fixture: ComponentFixture<ForumpostCreateComponent>;

  beforeEach(async(() => {
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
        { provide: Store, useValue: FPSMock },
        { provide: Router, useValue: Router },
        { provide: ActivatedRoute, useValue: ActivatedRoute },
        { provide: MatSnackBar, useValue: MatSnackBar },
        { provide: ChangeDetectorRef, useValue: ChangeDetectorRef },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumpostCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call create post once', () => {
    spyOn(component, 'post');
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    buttons.forEach(btn => {
      if (btn.nativeElement.textContent === 'Post') {
        btn.nativeElement.click();
      }
    });
    expect(component.post).toHaveBeenCalledTimes(1);
  });
});

class FPSMock {
  createPost(post: Forumpost, file: File): Observable<Forumpost> {
    return of({
      id: 'asdasfasfs',
      title: 'asdad',
      postDate: new Date(Date.now()).toISOString()
    });
  }

}
