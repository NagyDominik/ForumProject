import { TestBed, getTestBed } from '@angular/core/testing';

import { ForumpostsService } from './forumposts.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {from, Observable, of} from 'rxjs';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { FileService } from 'src/app/files/shared/file.service';
import {map} from 'rxjs/operators';


describe('ForumpostsService', () => {
  let angularFirestoreMock: any;
  let fileServiceMock: any;
  let fsCollectionMock: any;
  let httpMock: HttpTestingController;
  let service: ForumpostsService;
  let helper: Helper;
  beforeEach(() => {
    helper = new Helper();
    angularFirestoreMock = jasmine.createSpyObj('AngularFirestore', ['collection']);
    fsCollectionMock = jasmine.createSpyObj('collection', ['snapshotChanges', 'valueChanges', 'add']);
    angularFirestoreMock.collection.and.returnValue(fsCollectionMock);
    fsCollectionMock.snapshotChanges.and.returnValue(of([]));
    fileServiceMock = jasmine.createSpyObj('FileService', ['getFileUrl', 'upload']);
    TestBed.configureTestingModule({
      imports: [
        AngularFirestoreModule,
        HttpClientTestingModule,

      ],
      providers: [
        {provide: AngularFirestore, useValue: angularFirestoreMock},
        {provide: FileService, useValue: fileServiceMock}
      ]
    });
    httpMock = getTestBed().get(HttpTestingController);
    service = TestBed.get(ForumpostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getForumPosts', () => {
    beforeEach(() => {
      service.getAllPosts();
    });

    it('should be call collection and snapshotChanges on Firestore', () => {
      expect(angularFirestoreMock.collection).toHaveBeenCalledTimes(1);
    });

    it('should call snapshotChanges 1 time on AngularFirestore service', () => {
      expect(fsCollectionMock.snapshotChanges).toHaveBeenCalledTimes(1);
    });
  });

  describe('getForumPosts return value', () => {
    it('should be call getForumPosts and return a single post ', () => {
      fsCollectionMock.snapshotChanges.and.returnValue(helper.getActions(1));
      service.getAllPosts().subscribe(post => {
        expect(post.length).toBe(1);
      });
    });
  });

  it('should be call getForumPosts and return 10 posts ', () => {
    fsCollectionMock.snapshotChanges.and.returnValue(helper.getActions(10));
    service.getAllPosts().subscribe(post => {
      expect(post.length).toBe(10);
    });
  });

  describe('getForumPosts return value', () => {
    it('should be call getAllForumPosts and return a single post ', () => {
      fsCollectionMock.snapshotChanges.and.returnValue(helper.getActions(1));
      service.getAllPosts().subscribe(post => {
        expect(post.length).toBe(1);
      });
    });

    it('should be call getAllForumPosts and return 10 posts ', () => {
      fsCollectionMock.snapshotChanges.and.returnValue(helper.getActions(10));
      service.getAllPosts().subscribe(post => {
        expect(post.length).toBe(10);
      });
    });

    it('should be call getPostList and return 10 posts ', () => {
      fsCollectionMock.snapshotChanges.and.returnValue(helper.getActions(10));
      service.getPostsList().subscribe(post => {
        expect(post.length).toBe(10);
      });
    });
    it('should be call getPostList and return 10 posts ', () => {
      fsCollectionMock.snapshotChanges.and.returnValue(helper.getActions(1));
      service.getPostsList().subscribe(post => {
        expect(post.length).toBe(1);
      });
    });
  });

  describe('createPost', () => {
    /*this shit is not working*/
    it('createPost should be called once ', post => {
      expect(service.createPost(post, null))
        .toBe({id: 'asdasd', postDate: 'asdasdas', title: 'asd'});


    });
  });

  /*it('should be call getForumPosts and return a post with correct properties', () => {
    fsCollectionMock.snapshotChanges.and.returnValue(helper.getActions(1));
    service.getAllPosts().subscribe(posts => {
      expect(posts[0]).toEqual({
        id: 'abc0',
        title: 'asd0',
        postDate: 'date0'
      });
    });
  });*/
});

  class Helper {
    actions: any[] = [];

    getActions(amount: number): Observable<any[]> {
      for (let i = 0; i < amount; i++) {
        this.actions.push({
          payload: {
            doc: {
              id: 'abc' + i,
              data: () => {
                return {
                  title: 'asd' + i,
                  postDate: 'date' + i
                };
              }
            }
          }
        });
      }
      return of(this.actions);
    }
  }
