import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumpostCreateComponent } from './forumpost-create.component';

describe('ForumpostCreateComponent', () => {
  let component: ForumpostCreateComponent;
  let fixture: ComponentFixture<ForumpostCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumpostCreateComponent ]
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
