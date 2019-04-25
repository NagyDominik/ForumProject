import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ForumpostsListComponent } from './forumposts-list.component';
import { MatCardModule, MatIconModule, MatButtonModule } from '@angular/material';
import { Observable, of } from 'rxjs';
import { Forumpost } from '../shared/forumpost.model';
import { ForumpostsService } from '../shared/forumposts.service';
import {FileService} from '../../files/shared/file.service';
import {DOMHelper} from '../../testing/dom-helper';

describe('ForumpostsListComponent', () => {
  let component: ForumpostsListComponent;
  let fixture: ComponentFixture<ForumpostsListComponent>;
  let dh: DOMHelper<ForumpostsListComponent>;
  let forumPostServiceMock: any;
  let fileServiceMock: any;

  beforeEach(async(() => {
    forumPostServiceMock = jasmine.createSpyObj('ForumpostsService', ['getAllPosts']);
    forumPostServiceMock.getAllPosts.and.returnValue(of([]));
    fileServiceMock = jasmine.createSpyObj('FileService', ['getFileUrl']);
    fileServiceMock.getFileUrl.and.returnValue('');
    TestBed.configureTestingModule({
      declarations: [ForumpostsListComponent],
      imports: [
        MatCardModule,
        MatIconModule,
        MatButtonModule,
      ],
      providers: [
        { provide: FileService, useValue: fileServiceMock },
        { provide: ForumpostsService, useValue:  forumPostServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumpostsListComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 /*it('should have forumposts defined from an observable', () => {
    component.forumposts.subscribe(content => {
      expect(content).toBeDefined();
      expect(content.length).toBe(3);
    });
  });*/

 /* cypress test
  it('should show one post if we have one item', () => {
    component.forumposts = of([
      {id: 'testID', title: 'testTitle', postDate: new Date(Date.now()).toISOString()}
    ]);
    fixture.detectChanges();
    const  lissItem = fixture.debugElement
      .queryAll(By.css('mat-card'));
    expect(lissItem.length).toBe(1);
  });
  */


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
    });

    it('Should call deleteForumPost with the product to delete when we click Delete button', () => {
      component.forumposts = helper.getForumPosts(1);
      fixture.detectChanges();
      spyOn(component, 'deleteForumPost');
      dh.clickButton('Delete');
      expect(component.deleteForumPost).toHaveBeenCalledWith(helper.forumposts[0]);
    });
  });
*/
});

class Helper {
  forumposts: Forumpost[] = [];

  getForumPosts(amount: number): Observable<Forumpost[]> {
    for (let i = 0; i < amount; i++) {
      this.forumposts.push(
        {id: 'abc' + i, title: 'item' + i, postDate: new Date(Date.now()).toISOString()}
      );
    }
    return of(this.forumposts);
  }
}

