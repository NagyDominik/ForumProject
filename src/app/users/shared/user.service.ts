import { Injectable } from '@angular/core';
import { FileService } from 'src/app/files/shared/file.service';
import { Observable, from } from 'rxjs';
import { FileMeta } from 'src/app/files/shared/file-meta.model';
import { switchMap, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './user.model';
import { Local } from 'protractor/built/driverProviders';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fs: FileService, private db: AngularFirestore) { }

  createUser(user?: User): Observable<User> {
    return from(this.db.collection('users').add(
      {
        username: "DefaultUser",
        regDate: new Date(Date.now()).toISOString()
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
      const fileToUpload = new File([blob], name, { type: type });
      return this.fs.uploadImage(fileToUpload, "profile");
      
  }

}
