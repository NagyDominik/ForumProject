import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule, MatCardModule, MatIconModule, MatMenuModule, MatSnackBarModule } from '@angular/material';
import { NGXS_PLUGINS, NgxsModule, getActionTypeFromInstance } from '@ngxs/store';
import { of } from 'rxjs';

import { ForumpostsService } from '../shared/forumposts.service';
import { ForumpostsListComponent } from './forumposts-list.component';
import { NgxsTestPlugin, NGXS_ACTIONS } from 'src/testing/NgxsTestPlugin';
import { ForumpostsState } from 'src/app/store/state/forumposts.state';

describe('ForumpostsListComponent', () => {
  let component: ForumpostsListComponent;
  let fixture: ComponentFixture<ForumpostsListComponent>;
  // let dh: DOMHelper<ForumpostsListComponent>;
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
        NgxsModule.forRoot([])
      ],
      providers: [
        { provide: ForumpostsService, useValue: forumPostServiceMock },
        { provide: NGXS_PLUGINS, useClass: NgxsTestPlugin, multi: true}
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(ForumpostsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      /*Object.defineProperty(component, 'forumposts', {writable: true});
      const forumpost: Forumpost = {
                                    title: 'Title',
                                    description: 'Description',
                                    id: 'ASD123',
                                    pictureID: 'DSA321',
                                    pictureUrl: 'http://picture',
                                    postDate: Date.now().toLocaleString()
                                  };
      component.forumposts = of([forumpost]);*/

    }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('Should call getAllPosts on the ForumpostService one time on ngOnInit', () => {
  //   expect(forumPostServiceMock.getAllPosts).toHaveBeenCalledTimes(1);
  // });

  // it('should select the forumposts', () => {
  //   const actions = TestBed.get(NGXS_ACTIONS);
  //   expect(getActionTypeFromInstance(actions[0])).toEqual('Select');
  // });

});

