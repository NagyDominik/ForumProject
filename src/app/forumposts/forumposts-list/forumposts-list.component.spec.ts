import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatMenuModule,
  MatSnackBarModule,
  MatDialog,
} from '@angular/material';
import { NgxsModule, Store } from '@ngxs/store';
import { LoadForumPosts, UpdateForumPost, DeleteForumPost } from 'src/app/store/actions/forumposts.actions';
import { DOMHelper } from 'src/testing/dom-helper';

import { ForumpostsListComponent } from './forumposts-list.component';
import { FunctionHelper } from 'src/testing/function.helper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ForumpostsListComponent', () => {
  let component: ForumpostsListComponent;
  let fixture: ComponentFixture<ForumpostsListComponent>;
  let helper: FunctionHelper;
  let storeMock: any;
  let dialogMock: any;

  beforeEach(async(() => {
    storeMock = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    dialogMock = jasmine.createSpyObj('MatDialog', ['open']);
    helper = new FunctionHelper();

    TestBed.configureTestingModule({
      declarations: [ForumpostsListComponent],
      imports: [
        BrowserAnimationsModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatSnackBarModule,
        MatDialogModule,
        NgxsModule.forRoot([])
      ],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: MatDialog, useValue: dialogMock }
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(ForumpostsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the forumposts', () => {
    expect(storeMock.dispatch).toHaveBeenCalledWith(new LoadForumPosts());
    expect(storeMock.dispatch).toHaveBeenCalledTimes(1);
  });

  describe('openDialog', () => {
    it('should call dialog.open once', () => {
      dialogMock.open.and.returnValue(helper.getDialogReferenceMock(true));
      const updatePost = helper.getForumpostMock(true);
      component.openDialog(updatePost);
      expect(dialogMock.open).toHaveBeenCalledTimes(1);
    });

    it('should not do anything if afterClosed result is null', () => {
      dialogMock.open.and.returnValue(helper.getDialogReferenceMock(false));
      const updatePost = helper.getForumpostMock(true);
      component.openDialog(updatePost);
      expect(storeMock.dispatch).not.toHaveBeenCalledWith(new UpdateForumPost(updatePost));
    });

  });

  describe('deleteForumpost', () => {
    it('should call store.dispatch once', () => {
      storeMock.dispatch.calls.reset();
      const deletePost = helper.getForumpostMock(false);
      component.deleteForumPost(deletePost);
      expect(storeMock.dispatch).toHaveBeenCalledTimes(1);
      expect(storeMock.dispatch).toHaveBeenCalledWith(new DeleteForumPost(deletePost));
    });
  });

});

