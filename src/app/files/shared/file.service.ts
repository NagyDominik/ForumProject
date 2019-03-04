import { Injectable } from '@angular/core';
import { Observable, from, defer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators'
import { FileMeta } from './file-meta.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }

  uploadImage(fileToUpload: File, type: string): Observable<FileMeta> {
    return this.createFileMeta(
      {
        type: fileToUpload.type,
        name: fileToUpload.name,
        lastChanged: fileToUpload.lastModified,
        size: fileToUpload.size
      }
    ).pipe(
      switchMap(metaDataWithId => {
        return from(this.storage
          .ref(type == 'forum' ? 'forumpost-pictures/' : 'profile-pictures/' + metaDataWithId.id)
          .put(fileToUpload)
          .then())
          .pipe(
            map(() => {
              return metaDataWithId;
            })
          );
      })
    );
  }

  createFileMeta(metadata: FileMeta) {
    return defer( () =>
      this.db.collection<FileMeta>('files').add(metadata)
    ).pipe(
      map(metaRef => {
        metadata.id = metaRef.id;
        return metadata;
      })
    )
  }

  getFileUrl(pictureID: string): Observable<any> {
    return this.storage.ref('forumpost-pictures/' + pictureID).getDownloadURL();
  }

}
