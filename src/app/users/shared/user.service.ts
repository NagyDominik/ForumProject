import { Injectable } from '@angular/core';
import { FileService } from 'src/app/files/shared/file.service';
import { Observable } from 'rxjs';
import { FileMeta } from 'src/app/files/shared/file-meta.model';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fs: FileService, private db: AngularFirestore) { }

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
