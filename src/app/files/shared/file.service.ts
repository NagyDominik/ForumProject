import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators'
import { FileMeta } from './file-meta.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }

  upload(file: File): Observable<FileMeta> {
    debugger
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

  createFileMeta(metadata: FileMeta) {
    return from(
      this.db.collection<FileMeta>('files').add(metadata)
    ).pipe(
      map(metaRef => {
        metadata.id = metaRef.id;
        return metadata;
      })
    )
  }
}
