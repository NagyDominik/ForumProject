import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { FileService } from 'src/app/files/shared/file.service';
import { FunctionHelper } from 'src/testing/function.helper';

import { ForumpostsService } from './forumposts.service';

describe('ForumpostsService', () => {
  let angularFirestoreMock: any;
  let fileServiceMock: any;
  let firestoreCollectionMock: any;
  let firestoreDocMock: any;
  let service: ForumpostsService;
  let helper: FunctionHelper;

  beforeEach(() => {
    helper = new FunctionHelper();
    angularFirestoreMock = jasmine.createSpyObj('AngularFirestore', ['collection', 'doc']);
    firestoreCollectionMock = jasmine.createSpyObj('collection', ['snapshotChanges', 'valueChanges', 'add']);
    firestoreDocMock = jasmine.createSpyObj('doc', ['get', 'delete', 'update']);
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

    it('should call getAllPosts and return a single post', () => {
      firestoreCollectionMock.snapshotChanges.and.returnValue(helper.getSnapshotChangeDocChangeActions(1));
      service.getAllPosts().subscribe(post => {
        expect(post.length).toBe(1);
      });
    });

    it('should call getAllPosts and return 10 posts', () => {
      firestoreCollectionMock.snapshotChanges.and.returnValue(helper.getSnapshotChangeDocChangeActions(10));
      service.getAllPosts().subscribe(posts => {
        expect(posts.length).toBe(10);
      });
    });

    it('should call getPostList and return 10 posts', () => {
      firestoreCollectionMock.snapshotChanges.and.returnValue(helper.getSnapshotChangeDocChangeActions(10));
      service.getPostsList().subscribe(posts => {
        expect(posts.length).toBe(10);
      });
    });

    it('should include picture to posts', () => {
      firestoreCollectionMock.snapshotChanges.and.returnValue(helper.getSnapshotChangeDocChangeActions(10));
      service.getPostsList().subscribe(posts => {
        posts.forEach(post => {
          if (post.pictureUrl) {
            expect(post.pictureUrl).toEqual('URL');
          }
        });
      });
    });

    it('should not call fileservice getFileUrl with no post ID', () => {
      firestoreCollectionMock.snapshotChanges.and.returnValue(helper.getSnapshotChangeDocChangeActions(1));
      service.getPostsList().subscribe();
      expect(fileServiceMock.getFileUrl).toHaveBeenCalledTimes(0);
    });
  });

  describe('createPost', () => {
    beforeEach(() => {
      firestoreCollectionMock.add.and.returnValue(helper.getSnapshotChangeDocChangeActions(1));
      fileServiceMock.uploadImage.and.returnValue(helper.getFSImageUpload());
    });

    it('should call firestore once', () => {
      const tempFile = helper.getFileMock();
      service.createPost(helper.getForumpostMock(false), tempFile).subscribe();
      expect(firestoreCollectionMock.add).toHaveBeenCalledTimes(1);
    });

    it('should call createForumDBEntry once', () => {
      spyOn(service, 'createForumDBEntry').and.returnValue(of('test'));
      service.createPost(helper.getForumpostMock(true), null).subscribe();
      expect(service.createForumDBEntry).toHaveBeenCalledTimes(1);
    });

    it('should upload image if there is one', () => {
      const tempFile = helper.getFileMock();
      service.createPostWithImage(helper.getForumpostMock(false), tempFile).subscribe();
      expect(fileServiceMock.uploadImage).toHaveBeenCalledTimes(1);
    });

  });

  describe('deletePost', () => {
    beforeEach(() => {
      firestoreDocMock.delete.and.returnValue(helper.getPromiseMock());
    });

    it('should call firestore get once', () => {
      firestoreDocMock.get.and.returnValue(helper.getForumpostDocSnapshot(1));
      service.deletePost('id').subscribe();
      expect(firestoreDocMock.get).toHaveBeenCalledTimes(1);
    });

    it('should call firestore delete once', () => {
      firestoreDocMock.get.and.returnValue(helper.getForumpostDocSnapshot(1));
      service.deletePost('id').subscribe();
      expect(firestoreDocMock.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw error if post cannot be found', () => {
      firestoreDocMock.get.and.returnValue(helper.getForumpostDocSnapshot(0));
      service.deletePost('id').subscribe({
        error: (err) => {
          expect(err).toEqual(new Error('Post not found'));
        }
      });
    });

  });

  describe('updatePost', () => {
    beforeEach(() => {
      firestoreDocMock.update.and.returnValue(helper.getPromiseMock());
    });

    it('should call firestore get once', () => {
      firestoreDocMock.get.and.returnValue(helper.getForumpostDocSnapshot(1));
      service.updatePost(helper.getForumpostMock(false)).subscribe();
      expect(firestoreDocMock.get).toHaveBeenCalledTimes(1);
    });

    it('should throw error if the update data is null', () => {
      service.updatePost(undefined).subscribe({
        error: (err) => {
          expect(err).toEqual(new Error('Update data cannot be null'));
        }
      });
    });

    it('should call firestore collection update once', () => {
      firestoreDocMock.get.and.returnValue(helper.getForumpostDocSnapshot(1));
      service.updatePost(helper.getForumpostMock(false)).subscribe();
      expect(firestoreDocMock.update).toHaveBeenCalledTimes(1);
    });

    it('should throw error if post cannot be found', () => {
      firestoreDocMock.get.and.returnValue(helper.getForumpostDocSnapshot(0));
      service.updatePost(helper.getForumpostMock(false)).subscribe({
        error: (err) => {
          expect(err).toEqual(new Error('Post not found'));
        }
      });
    });

  });

});
