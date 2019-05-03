import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule, MatCardModule, MatIconModule, MatMenuModule, MatSnackBarModule, MatDialogModule } from '@angular/material';
import { NGXS_PLUGINS, NgxsModule, getActionTypeFromInstance } from '@ngxs/store';
import { of } from 'rxjs';

import { ForumpostsService } from '../shared/forumposts.service';
import { ForumpostsListComponent } from './forumposts-list.component';
import { NgxsTestPlugin, NGXS_ACTIONS } from 'src/testing/NgxsTestPlugin';
import { ForumpostsState } from 'src/app/store/state/forumposts.state';
import { NgModule } from '@angular/core';
import { DOMHelper } from 'src/testing/dom-helper';

describe('ForumpostsListComponent', () => {
  let component: ForumpostsListComponent;
  let fixture: ComponentFixture<ForumpostsListComponent>;
  let dh: DOMHelper<ForumpostsListComponent>;
  let forumPostServiceMock: any;

  beforeEach(async(() => {
    forumPostServiceMock = jasmine.createSpyObj('ForumpostsService', ['getAllPosts']);
    forumPostServiceMock.getAllPosts.and.returnValue(of([]));

    TestBed.configureTestingModule({
      declarations: [ForumpostsListComponent],
      imports: [
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatSnackBarModule,
        MatDialogModule,
        NgxsModule.forRoot([])
      ],
      providers: [
        { provide: ForumpostsService, useValue: forumPostServiceMock },
        { provide: NGXS_PLUGINS, useClass: NgxsTestPlugin, multi: true},
        { provide: NGXS_ACTIONS, useValue: []}
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(ForumpostsListComponent);
        component = fixture.componentInstance;
        dh = new DOMHelper(fixture);
        fixture.detectChanges();
      });

    }));

     it('should create', () => {
       expect(component).toBeTruthy();
     });

     it('should select the forumposts', () => {
       const actions = TestBed.get(NGXS_ACTIONS);
       expect(getActionTypeFromInstance(actions[1])).toEqual('[Forumposts] Load Forumposts');
     });

});

