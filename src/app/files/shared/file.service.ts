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

  uploadImage(file: File, type: string): Observable<FileMeta> {
    const uid = this.db.createId();
    return defer(() =>
        this.storage.ref(type == 'forum' ? 'forumpost-pictures/' : 'profile-pictures/' + uid)
        .put(file, {
          customMetadata: {
            originalName: file.name
          }
        })
        .then()
      ).pipe(
        map(fileRef => {
          fileRef.id = uid;
          return fileRef;
        })
      );
  }

  getFileUrl(pictureID: string): Observable<any> {
    return this.storage.ref('forumpost-pictures/' + pictureID).getDownloadURL();
  }

}
