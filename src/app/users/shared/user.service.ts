import { Injectable } from '@angular/core';
import { FileService } from 'src/app/files/shared/file.service';
import { Observable, from } from 'rxjs';
import { FileMeta } from 'src/app/files/shared/file-meta.model';
import { switchMap, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fs: FileService, private db: AngularFirestore) { }

  createUser(user: User): Observable<User> {
    return from(this.db.collection('users').add(
      {
        username: user.username,
        regDate: Date.now()
      }
    )
    ).pipe(
      map(userRef => {
        user.id = userRef.id;
        return user;
      })
    )
  }

  uploadProfileImage(blob: Blob, type: string, name: string): Observable<FileMeta> {
    /*if (blob) {
      const fileToUpload = new File([blob], name, {type: type});
      return this.fs.uploadImage(fileToUpload, 'profile')
      .pipe(
        switchMap(pic => {
          if(this.db.collection.) {
            return from(this.db.collection('users').add())
          }
        });
      )
    }*/
    return undefined;
  }

}
