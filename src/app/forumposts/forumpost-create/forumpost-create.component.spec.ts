import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Forumpost } from '../shared/forumpost.model';
import { ForumpostsService } from '../shared/forumposts.service';
import { ForumpostCreateComponent } from './forumpost-create.component';
import { By } from '@angular/platform-browser';

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
      ],
      providers: [
        { provide: ForumpostsService, useValue: new FPSMock() },
        { provide: Router, useValue: Router },
        { provide: ActivatedRoute, useValue: ActivatedRoute },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumpostCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
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
