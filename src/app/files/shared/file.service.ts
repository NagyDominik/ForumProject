import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { defer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FileMeta } from './file-meta.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }

  // TODO: this returns an UploadTaskSnapshot insted of a FileMeta
  uploadImage(file: File, location: string): Observable<FileMeta> {
    const uid = this.db.createId();
    return defer(() => this.storage.ref(this.createPath(location, uid))
      .put(file, {
        customMetadata: {
          originalName: file.name
        }
      })
      .then()
    ).pipe(
      map(fileRef => {
        fileRef.id = uid;
        console.log('FileRef:', fileRef);
        return fileRef;
      })
    );
  }

  getFileUrl(pictureID: string, location: string): Observable<any> {
    return this.storage.ref(this.createPath(location, pictureID)).getDownloadURL();
  }

  createPath(location: string, objname: string): string {
    switch (location) {
      case 'forum': {
        return 'forumpost-pictures/' + objname;
      }
      case 'profile': {
        return 'profile-pictures/' + objname;
      }
    }
  }

}
