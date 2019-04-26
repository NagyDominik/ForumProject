import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ForumpostsListComponent } from './forumposts-list.component';
import { MatCardModule, MatIconModule, MatButtonModule } from '@angular/material';
import { Observable, of } from 'rxjs';
import { Forumpost } from '../shared/forumpost.model';
import { ForumpostsService } from '../shared/forumposts.service';
import { FileService } from 'src/app/files/shared/file.service';

describe('ForumpostsListComponent', () => {
  let component: ForumpostsListComponent;
  let fixture: ComponentFixture<ForumpostsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForumpostsListComponent],
      imports: [
        MatCardModule,
        MatIconModule,
        MatButtonModule,
      ],
      providers: [
        { provide: ForumpostsService, useValue: new FPSMock() },
        { provide: FileService, useValue: new FSMock() }
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

  it('should have forumposts defined from an observable', () => {
    component.forumposts.subscribe(content => {
      expect(content).toBeDefined();
      expect(content.length).toBe(3);
    });
  });

});

class FPSMock {
  getAllPosts(): Observable<Forumpost[]> {
    return of(
      [
        {
          id: 'asdasfasfs',
          title: 'asdad',
          postDate: new Date(Date.now()).toISOString()
        },
        {
          id: 'asdasfasfs2',
          title: 'asdad 2',
          postDate: new Date(Date.now()).toISOString()
        },
        {
          id: 'asdasfasfs3',
          title: 'asdad 3',
          postDate: new Date(Date.now()).toISOString()
        }
      ]
    )
  }
}

class FSMock {
  
}