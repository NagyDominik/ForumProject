import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumpostCreateComponent } from './forumpost-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { ForumpostsService } from '../shared/forumposts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ForumpostCreateComponent', () => {
  let component: ForumpostCreateComponent;
  let fixture: ComponentFixture<ForumpostCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumpostCreateComponent ],
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
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumpostCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class FPSMock {
 
}