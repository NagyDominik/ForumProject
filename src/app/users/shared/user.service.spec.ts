import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { of, Observable } from 'rxjs';
import { FileService } from 'src/app/files/shared/file.service';

import { UserService } from './user.service';
import { FileMeta } from 'src/app/files/shared/file-meta.model';
import { User } from './user.model';
import { map } from 'rxjs/operators';

describe('UserService', () => {
  let angularFirestoreMock: any;
  let fileServiceMock: any;
  let firestoreCollectionMock: any;
  let firestoreDocMock: any;
  let service: UserService;
  let helper: Helper;

  beforeEach(() => {
    helper = new Helper();
    angularFirestoreMock = jasmine.createSpyObj('AngularFirestore', ['collection']);
    firestoreCollectionMock = jasmine.createSpyObj('collection', ['doc']);
    firestoreDocMock = jasmine.createSpyObj('doc', ['snapshotChanges']);
    fileServiceMock = jasmine.createSpyObj('FileService', ['uploadImage']);
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
      firestoreDocMock.snapshotChanges.and.returnValue(helper.getUserWithProfilePic(true));
      service.getUserById('id').subscribe();
      expect(firestoreDocMock.snapshotChanges).toHaveBeenCalledTimes(1);
    });

    it('should throw exception if profile picture not found', () => {
      firestoreDocMock.snapshotChanges.and.returnValue(helper.getUserWithProfilePic(false));
      service.getUserById('id').subscribe({
        error: (err) => {
          expect(err).toEqual(new Error('Profile picture cannot be found!'));
        }
      });
    });

    it('should return user with the correct data', () => {
      const testuser = helper.getUserWithProfilePic(true);
      firestoreDocMock.snapshotChanges.and.returnValue(testuser);
      service.getUserById('id').subscribe(user => {
        expect(user.id).toBe('fuiwehfvsdhgfoew');
      });
    });
  });

  describe('getUserWithProfilePic', () => {
    // it('should call getUserById once', () => {
    //   service.getUserWithProfilePic('id');
    //   expect(service.getUserById).toHaveBeenCalledTimes(1);
    // });
  });
});

class Helper {
  id = 'fuiwehfvsdhgfoew';

  getUserWithProfilePic(img: boolean): Observable<any> {
    const temp = {
      payload: {
        id: this.id,
        data: () => { },
      }
    };
    if (img) {
      temp.payload.data = () => {
        return {
          username: 'testUser',
          regDate: new Date(Date.now()).toISOString(),
          profilePicId: 'asd',
        };
      };
    } else {
      temp.payload.data = () => {
        return {
          username: 'testUser',
          regDate: new Date(Date.now()).toISOString(),
        };
      };
    }

    return of(temp);
  }

  getFileMeta(): Observable<FileMeta> {
    return of(
      {
        name: 'Test',
        type: 'image/png',
        size: 1500,
      }
    );
  }

  getEventWithFile(): any {
    return {
      target: {
        files: [
          {
            type: 'image/png',
          }
        ]
      },
      file: {},
      base64: 'base64',
    };
  }
}
