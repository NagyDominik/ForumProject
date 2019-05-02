import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { FileService } from 'src/app/files/shared/file.service';
import { FunctionHelper } from 'src/testing/function.helper';

import { UserService } from './user.service';

describe('UserService', () => {
  let angularFirestoreMock: any;
  let fileServiceMock: any;
  let firestoreCollectionMock: any;
  let firestoreDocMock: any;
  let service: UserService;
  let helper: FunctionHelper;

  beforeEach(() => {
    helper = new FunctionHelper();
    angularFirestoreMock = jasmine.createSpyObj('AngularFirestore', ['collection']);
    firestoreCollectionMock = jasmine.createSpyObj('collection', ['doc']);
    firestoreDocMock = jasmine.createSpyObj('doc', ['snapshotChanges']);
    fileServiceMock = jasmine.createSpyObj('FileService', ['uploadImage', 'getFileUrl']);
    angularFirestoreMock.collection.and.returnValue(firestoreCollectionMock);
    firestoreCollectionMock.doc.and.returnValue(firestoreDocMock);

    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: angularFirestoreMock },
        { provide: FileService, useValue: fileServiceMock }
      ]
    });
    service = TestBed.get(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('uploadProfileImage', () => {
    it('should be called once ', () => {
      const testBlob: Blob = new Blob();
      fileServiceMock.uploadImage.and.returnValue(helper.getFileMeta());
      service.uploadProfileImage(testBlob, 'test', 'test').subscribe();
      expect(fileServiceMock.uploadImage).toHaveBeenCalledTimes(1);
    });
  });

  describe('getUserById', () => {
    it('should call firestore once ', () => {
      firestoreDocMock.snapshotChanges.and.returnValue(helper.getUserWithProfilePicId(true));
      service.getUserById('id').subscribe();
      expect(firestoreDocMock.snapshotChanges).toHaveBeenCalledTimes(1);
    });

    it('should throw exception if profile picture not found', () => {
      firestoreDocMock.snapshotChanges.and.returnValue(helper.getUserWithProfilePicId(false));
      service.getUserById('id').subscribe({
        error: (err) => {
          expect(err).toEqual(new Error('Profile picture cannot be found!'));
        }
      });
    });

    it('should return user with the correct data', () => {
      const testuser = helper.getUserWithProfilePicId(true);
      firestoreDocMock.snapshotChanges.and.returnValue(testuser);
      service.getUserById('id').subscribe(user => {
        expect(user.id).toBe('fuiwehfvsdhgfoew');
      });
    });
  });

  describe('getUserWithProfilePic', () => {
    it('should call getUserById once', () => {
      fileServiceMock.getFileUrl.and.returnValue(of('URL'));
      spyOn(service, 'getUserById').and.returnValue(helper.getUserWithProfilePicId(true));
      service.getUserWithProfilePic('id').subscribe();
      expect(service.getUserById).toHaveBeenCalledTimes(1);
    });
  });
});
