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

  uploadPostImage(file: File): Observable<FileMeta> {
    return this.createFileMeta(
      {
        type: file.type,
        name: file.name,
        lastChanged: file.lastModified,
        size: file.size
      }
    ).pipe(
      switchMap(metaDataWithId => {
        return from(this.storage
          .ref('forumpost-pictures/' + metaDataWithId.id)
          .put(file)
          .then())
          .pipe(
            map(() => {
              return metaDataWithId;
            })
          );
      })
    );
  }

  uploadProfileImage(file: File): Observable<FileMeta> {
    return this.createFileMeta(
      {
        type: file.type,
        name: file.name,
        lastChanged: file.lastModified,
        size: file.size
      }
    ).pipe(
      switchMap(metaDataWithId => {
        return from(this.storage
          .ref('profile-pictures/' + metaDataWithId.id)
          .put(file)
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
    );
  }

  getFileUrl(pictureID: string): Observable<any> {
    return this.storage.ref('forumpost-pictures/' + pictureID).getDownloadURL();
  }

  imgBlobtoFile() {
  }

}
