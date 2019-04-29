import { Injectable } from '@angular/core';
import { Observable, from, defer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FileMeta } from './file-meta.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }

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
