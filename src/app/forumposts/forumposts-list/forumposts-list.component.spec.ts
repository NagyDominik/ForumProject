import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ForumpostsListComponent } from './forumposts-list.component';
import {MatCardModule, MatIconModule, MatButtonModule, MatMenuModule} from '@angular/material';
import { Observable, of } from 'rxjs';
import { ForumpostsService } from '../shared/forumposts.service';

import {DOMHelper} from '../../../testing/dom-helper';


describe('ForumpostsListComponent', () => {
  let component: ForumpostsListComponent;
  let fixture: ComponentFixture<ForumpostsListComponent>;

  let dh: DOMHelper<ForumpostsListComponent>;
  let forumPostServiceMock: any;

  beforeEach(async(() => {
    forumPostServiceMock = jasmine.createSpyObj('ForumpostsService', ['getAllPosts']);
    forumPostServiceMock.getAllPosts.and.returnValue(of([]));


    beforeEach(async(() => {

      TestBed.configureTestingModule({
        declarations: [ForumpostsListComponent],
        imports: [
          MatCardModule,
          MatIconModule,
          MatButtonModule,
          MatMenuModule
        ],
        providers: [
          {provide: ForumpostsService, useValue: forumPostServiceMock}
        ]
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

    it('Should call getAllPosts on the ForumpostService one time on ngOnInit', () => {
      expect(forumPostServiceMock.getAllPosts).toHaveBeenCalledTimes(1);
    });

    /*
      describe('Delete Products', () => {
        let helper: Helper;
        beforeEach(() => {
          helper = new Helper();
          fixture.detectChanges();
        });
        it('Should call deleteForumPost once when we click Delete button', () => {
          component.forumposts = helper.getForumPosts(1);
          fixture.detectChanges();
          spyOn(component, 'deleteForumPost');
          dh.clickButton('Delete');
          expect(component.deleteForumPost).toHaveBeenCalledTimes(1);
        });*/
  }));
  });
