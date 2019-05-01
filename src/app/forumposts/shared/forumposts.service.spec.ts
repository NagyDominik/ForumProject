import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { FileService } from 'src/app/files/shared/file.service';

import { ForumpostsService } from './forumposts.service';

describe('ForumpostsService', () => {
  let angularFirestoreMock: any;
  let fileServiceMock: any;
  let firestoreCollectionMock: any;
  let firestoreDocMock: any;
  let service: ForumpostsService;
  let helper: Helper;

  beforeEach(() => {
    helper = new Helper();
    angularFirestoreMock = jasmine.createSpyObj('AngularFirestore', ['collection', 'doc']);
    firestoreCollectionMock = jasmine.createSpyObj('collection', ['snapshotChanges', 'valueChanges', 'add']);
    firestoreDocMock = jasmine.createSpyObj('doc', ['get', 'delete']);
    fileServiceMock = jasmine.createSpyObj('FileService', ['getFileUrl', 'uploadImage']);

    angularFirestoreMock.collection.and.returnValue(firestoreCollectionMock);
    firestoreCollectionMock.snapshotChanges.and.returnValue(of([]));
    angularFirestoreMock.doc.and.returnValue(firestoreDocMock);

    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: angularFirestoreMock },
        { provide: FileService, useValue: fileServiceMock }
      ]
    });

    service = TestBed.get(ForumpostsService);
  });

  it('should create', () => {
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
      expect(firestoreCollectionMock.snapshotChanges).toHaveBeenCalledTimes(1);
    });
  });

  describe('getForumPosts return value', () => {
    beforeEach(() => {
      fileServiceMock.getFileUrl.and.returnValue(of('URL'));
    });

    it('should call getAllPosts and return a single post ', () => {
      firestoreCollectionMock.snapshotChanges.and.returnValue(helper.getActions(1));
      service.getAllPosts().subscribe(post => {
        expect(post.length).toBe(1);
      });
    });

    it('should call getAllPosts and return 10 posts ', () => {
      firestoreCollectionMock.snapshotChanges.and.returnValue(helper.getActions(10));
      service.getAllPosts().subscribe(posts => {
        expect(posts.length).toBe(10);
      });
    });

    it('should call getPostList and return 10 posts ', () => {
      firestoreCollectionMock.snapshotChanges.and.returnValue(helper.getActions(10));
      service.getPostsList().subscribe(posts => {
        expect(posts.length).toBe(10);
      });
    });

    it('should include picture to posts ', () => {
      firestoreCollectionMock.snapshotChanges.and.returnValue(helper.getActions(10));
      service.getPostsList().subscribe(posts => {
        posts.forEach(post => {
          if (post.pictureUrl) {
            expect(post.pictureUrl).toEqual('URL');
          }
        });
      });
    });
  });

  describe('createPost', () => {
    beforeEach(() => {
      firestoreCollectionMock.add.and.returnValue(helper.getActions(1));
      fileServiceMock.uploadImage.and.returnValue(helper.getImageUpload());
    });

    it('should be called once ', () => {
      service.createPost({ id: 'asdasd', postDate: 'asdasdas', title: 'asd', description: 'description' }, null).subscribe();
      expect(firestoreCollectionMock.add).toHaveBeenCalledTimes(1);
    });

    it('should upload image if there is one ', () => {
      const tempFile = new File([], 'test');
      service.createPost({ id: 'asdasd', postDate: 'asdasdas', title: 'asd', description: 'description' }, tempFile).subscribe();
      expect(fileServiceMock.uploadImage).toHaveBeenCalledTimes(1);
    });

  });

  describe('deletePost', () => {
    it('should be called once ', () => {
      firestoreDocMock.get.and.returnValue(helper.getActions(1));
      service.deletePost('id');
      expect(firestoreDocMock.get).toHaveBeenCalledTimes(1);
    });

    it('should call firestore collection delete once', () => {
      firestoreDocMock.get.and.returnValue(helper.getDocumentSnapshot(1));
      firestoreDocMock.delete.and.returnValue(helper.getDocumentSnapshot(1));
      service.deletePost('id').subscribe();
      expect(firestoreDocMock.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw error if post cannot be found', () => {
      firestoreDocMock.get.and.returnValue(helper.getDocumentSnapshot(0));
      firestoreDocMock.delete.and.returnValue(helper.getDocumentSnapshot(1));
      service.deletePost('id').subscribe({
        error: (err) => {
          expect(err).toEqual(new Error('Post not found'));
        }
      });
    });

  });

});

class Helper {
  actions: any[] = [];
  docSnapshot: any;

  getActions(amount: number): Observable<any[]> {
    for (let i = 0; i < amount; i++) {
      this.actions.push({
        payload: {
          doc: {
            id: 'abc' + i,
            data: () => {
              return {
                title: 'asd' + i,
                postDate: 'date' + i,
                description: 'description',
                pictureID: 'picID'
              };
            }
          }
        }
      });
    }
    return of(this.actions);
  }

  getDocumentSnapshot(num: number): Observable<any> {
    if (num === 0) {
      this.docSnapshot = {
        id: 'asdasdas',
        data: () => {
          return;
        }
      };
    } else {
      this.docSnapshot = {
        id: 'asdasdas',
        data: () => {
          return {
            title: 'asd',
            postDate: 'date',
          };
        }
      };
    }
    return of(this.docSnapshot);
  }

  getImageUpload(): Observable<any> {
    return of({
      id: 'test',
    });
  }
}
