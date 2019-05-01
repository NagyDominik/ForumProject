import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed, async } from '@angular/core/testing';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
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

    angularFirestoreMock.collection.and.returnValue(firestoreCollectionMock);
    firestoreCollectionMock.snapshotChanges.and.returnValue(of([]));

    angularFirestoreMock.doc.and.returnValue(firestoreDocMock);

    fileServiceMock = jasmine.createSpyObj('FileService', ['getFileUrl', 'uploadImage']);

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
    it('should be call getAllForumPosts and return a single post ', () => {
      firestoreCollectionMock.snapshotChanges.and.returnValue(helper.getActions(1));
      service.getAllPosts().subscribe(post => {
        expect(post.length).toBe(1);
      });
    });

    it('should be call getAllForumPosts and return 10 posts ', () => {
      firestoreCollectionMock.snapshotChanges.and.returnValue(helper.getActions(10));
      service.getAllPosts().subscribe(post => {
        expect(post.length).toBe(10);
      });
    });

    it('should be call getPostList and return 10 posts ', () => {
      firestoreCollectionMock.snapshotChanges.and.returnValue(helper.getActions(10));
      service.getPostsList().subscribe(post => {
        expect(post.length).toBe(10);
      });
    });
  });

  describe('createPost', () => {
    beforeEach(() => {
      firestoreCollectionMock.add.and.returnValue(helper.getActions(1));
      service.createPost({ id: 'asdasd', postDate: 'asdasdas', title: 'asd', description: 'description' }, null).subscribe();
    });

    it('should be called once ', () => {
      expect(firestoreCollectionMock.add).toHaveBeenCalledTimes(1);
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

    // Dunno how to catch the error
    // it('should throw error if post cannot be found', () => {
    //   firestoreDocMock.get.and.returnValue(helper.getDocumentSnapshot(0));
    //   firestoreDocMock.delete.and.returnValue(helper.getDocumentSnapshot(1));
    //   try {
    //     service.deletePost('id').subscribe();
    //   } catch (error) {
    //     expect(error).toBe(new Error('Post not found'));
    //   }
    // });
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
                // pictureID: 'picID'
              };
            }
          }
        }
      });
    }
    return of(this.actions);
  }

  getDocumentSnapshot(num: number): Observable<any[]> {
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
}
