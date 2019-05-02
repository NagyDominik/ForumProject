import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { FileService } from './file.service';
import { FunctionHelper } from 'src/testing/function.helper';
import { reject } from 'q';
import { of } from 'rxjs';

describe('FileService', () => {
  let angularFirestoreMock: any;
  let angularFireStorageMock: any;
  let firestorageRefMock: any;
  let service: FileService;
  let helper: FunctionHelper;

  beforeEach(() => {
    helper = new FunctionHelper();
    angularFirestoreMock = jasmine.createSpyObj('AngularFirestore', ['createId']);
    angularFireStorageMock = jasmine.createSpyObj('AngularFireStorage', ['ref']);
    firestorageRefMock = jasmine.createSpyObj('ref', ['put', 'getDownloadURL']);

    angularFireStorageMock.ref.and.returnValue(firestorageRefMock);

    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: angularFirestoreMock },
        { provide: AngularFireStorage, useValue: angularFireStorageMock }
      ]
    });
    service = TestBed.get(FileService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('uploadImage', () => {
    beforeEach(() => {
      firestorageRefMock.put.and.returnValue(new Promise((resolve) => of('Test')));
      angularFirestoreMock.createId.and.returnValue('testID');
    });

    it('should call createId once', () => {
      service.uploadImage(helper.getFileMock(), 'forum').subscribe();
      expect(angularFirestoreMock.createId).toHaveBeenCalledTimes(1);
    });

    it('should call sotage reference put once', () => {
      service.uploadImage(helper.getFileMock(), 'forum').subscribe();
      expect(firestorageRefMock.put).toHaveBeenCalledTimes(1);
    });

    it('should return FileMeta with correct data', () => {
      const testfile = helper.getFileMock();
      let res: any;
      service.uploadImage(testfile, 'forum').subscribe(filemeta => {
        res = filemeta;
        expect(res).toContain(testfile);
      });
    });
  });

  describe('getFileUrl', () => {
    it('should call createId once', () => {
      firestorageRefMock.getDownloadURL.and.returnValue(of('DownloadURL'));
      service.getFileUrl('testID', 'forum').subscribe();
      expect(firestorageRefMock.getDownloadURL).toHaveBeenCalledTimes(1);
    });
  });

  describe('createPath', () => {
    it('should return the correct path with forum as location', () => {
      const res = service.createPath('forum', 'testObject');
      expect(res).toBe('forumpost-pictures/testObject');
    });

    it('should return the correct path with profile as location', () => {
      const res = service.createPath('profile', 'testObject');
      expect(res).toBe('profile-pictures/testObject');
    });
  });

});
