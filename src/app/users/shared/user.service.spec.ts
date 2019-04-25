import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { FileService } from 'src/app/files/shared/file.service';
import { UserService } from './user.service';

describe('UserService', () => {
  let angularFirestoreMock: any;
  let fileServiceMock: any;
  let fsCollectionMock: any;
  let httpMock: HttpTestingController;
  let service: UserService;
  beforeEach(() => {
    angularFirestoreMock = jasmine.createSpyObj('AngularFirestore', ['collection']);
    fsCollectionMock = jasmine.createSpyObj('collection', ['snapshotChanges', 'valueChanges']);
    angularFirestoreMock.collection.and.returnValue(fsCollectionMock);
    fsCollectionMock.snapshotChanges.and.returnValue(of([]));
    fileServiceMock = jasmine.createSpyObj('FileService', ['getFileUrl', 'upload']);

    TestBed.configureTestingModule({
      imports: [
        AngularFirestoreModule,
        HttpClientTestingModule
      ],
      providers: [
        {provide: AngularFirestore, useValue: angularFirestoreMock},
        {provide: FileService, useValue: fileServiceMock}
      ]
    });
    httpMock = getTestBed().get(HttpTestingController);
    service = TestBed.get(UserService);
  });

  it('should be created', () => {
    const userservice: UserService = TestBed.get(UserService);
    expect(userservice).toBeTruthy();
  });
});
