import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Forumpost } from './forumpost.model';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { FileService } from 'src/app/files/shared/file.service';

@Injectable({
  providedIn: 'root'
})
export class ForumpostsService {

  constructor(private db: AngularFirestore, private fs: FileService) { }

  createPost(post: Forumpost, file: File): Observable<Forumpost> {
    let postProcessed: Forumpost = {
      title: post.title,
      postDate: Date.now()
    };

    if (post.description)
      postProcessed.description = post.description;

    if (file) {
      this.fs.uploadPostImage(file).subscribe(picture => {
        postProcessed.pictureID = picture.id;
        return this.createForumDBEntry(postProcessed)
      });
    } else {
      return this.createForumDBEntry(postProcessed);
    }
  }

  getAllPosts(): Observable<Forumpost[]> {
    return this.db.collection<Forumpost>('forumposts', ref => ref.orderBy('postDate', 'desc'))
      .snapshotChanges()
      .pipe(
        map(dcActions => {
          return dcActions.map(dcAction => {
            const data = dcAction.payload.doc.data() as Forumpost;
            let post: Forumpost = {
              id: dcAction.payload.doc.id,
              title: data.title,
              postDate: data.postDate
            }
            if (data.description)
              post.description = data.description;
            if (data.pictureID)
              post.pictureID = data.pictureID;
            return post;
          })
        })
      )
  }

  createForumDBEntry(post: Forumpost): Observable<Forumpost> {
    return from(this.db.collection('forumposts').add(post))
      .pipe(
        map(postRef => {
          post.id = postRef.id;
          return post;
        })
      )
  }

}