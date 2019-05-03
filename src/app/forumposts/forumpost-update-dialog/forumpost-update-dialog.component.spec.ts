import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatFormFieldModule, MatDialogRef, MAT_DIALOG_DATA, MatInputModule } from '@angular/material';

import { ForumpostUpdateDialogComponent } from './forumpost-update-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ForumpostUpdateDialogComponent', () => {
  let component: ForumpostUpdateDialogComponent;
  let fixture: ComponentFixture<ForumpostUpdateDialogComponent>;
  let dialogRefMock: any;

  beforeEach(async(() => {
    dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      declarations: [ ForumpostUpdateDialogComponent ],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatDialogModule,
        MatInputModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: {title: 'Test'}},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumpostUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('save', () => {
    it('should call dialogRef close with new title as argument', () => {
      component.PostForm.get('newTitle').setValue('Test Title');
      component.save();
      expect(dialogRefMock.close).toHaveBeenCalledWith('Test Title');
    });
  });

  describe('cancel', () => {
    it('should call dialogRef close without arguments', () => {
      component.cancel();
      expect(dialogRefMock.close).toHaveBeenCalledWith();
    });
  });

});
