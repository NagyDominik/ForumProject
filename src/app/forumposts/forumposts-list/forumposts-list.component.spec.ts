import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumpostsListComponent } from './forumposts-list.component';

describe('ForumpostsListComponent', () => {
  let component: ForumpostsListComponent;
  let fixture: ComponentFixture<ForumpostsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumpostsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumpostsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
