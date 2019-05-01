import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FileMeta } from 'src/app/files/shared/file-meta.model';
import { FileService } from 'src/app/files/shared/file.service';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fs: FileService, private db: AngularFirestore) { }

  /*createUser(user?: User): Observable<User> {
    return from(this.db.collection('users').add(
      {
        username: 'DefaultUser',
        regDate: new Date(Date.now()).toISOString()
      }
    )
    ).pipe(
      map(userRef => {
        user.id = userRef.id;
        return user;
      })
    );
  }*/

  uploadProfileImage(blob: Blob, type: string, name: string): Observable<FileMeta> {
    const fileToUpload = new File([blob], name, { type: type });
    return this.fs.uploadImage(fileToUpload, 'profile');
  }

  getUserById(userID: string) {
    return this.db.collection<User>('users').doc(userID)
      .snapshotChanges()
      .pipe(
        map(userRef => {
          const data = userRef.payload.data() as User;
          if (!data.profilePicId) {
            throw new Error('Profile picture cannot be found!');
          }
          const user: User = {
            id: userRef.payload.id,
            username: data.username,
            regDate: data.regDate,
            profilePicId: data.profilePicId
          };
          return user;
        })
      );
  }

  getUserWithProfilePic(userId: string): Observable<User> {
    return this.getUserById(userId)
      .pipe(switchMap(userRef => {
        return this.fs.getFileUrl(userRef.profilePicId, 'profile')
          .pipe(map(picUrl => {
            userRef.profilePicUrl = picUrl;
            return userRef;
          }
          ));
      }
      ));
  }
}
