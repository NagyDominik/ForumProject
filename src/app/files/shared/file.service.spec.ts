import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { FileService } from './file.service';

describe('FileService', () => {
  let angularFirestoreMock: any;
  let angularFireStorageMock: any;
  let service: FileService;

  beforeEach(() => {
    angularFirestoreMock = jasmine.createSpyObj('AngularFirestore', ['createId']);
    angularFireStorageMock = jasmine.createSpyObj('AngularFireStorage', ['createId']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: angularFirestoreMock },
        { provide: AngularFireStorage, useValue: angularFireStorageMock }
      ]
    });
    service = TestBed.get(FileService);
  });

  it('should create', () => {
    expect(FileService).toBeTruthy();
  });

  describe('uploadImage', () => {
    it('should call createId once', () => {
    });
  });

});
