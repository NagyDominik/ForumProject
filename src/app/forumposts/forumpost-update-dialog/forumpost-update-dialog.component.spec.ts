import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumpostUpdateDialogComponent } from './forumpost-update-dialog.component';

describe('ForumpostUpdateDialogComponent', () => {
  let component: ForumpostUpdateDialogComponent;
  let fixture: ComponentFixture<ForumpostUpdateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumpostUpdateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumpostUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

});
