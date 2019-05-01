import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { FileService } from 'src/app/files/shared/file.service';

import { Forumpost } from './forumpost.model';

@Injectable({
  providedIn: 'root'
})
export class ForumpostsService {

  constructor(private db: AngularFirestore, private fs: FileService) { }

  createPost(post: Forumpost, file: File): Observable<Forumpost> {
    const postProcessed: Forumpost = {
      title: post.title,
      postDate: new Date(Date.now()).toISOString()
    };

    if (post.description) {
      postProcessed.description = post.description;
    }

    if (file) {
      this.fs.uploadImage(file, 'forum').subscribe(picture => {
        console.log('Meta:', picture);
        postProcessed.pictureID = picture.id;
        console.log('Image uploaded', postProcessed);
      });
    }

    return this.createForumDBEntry(postProcessed);

  }

  getAllPosts(): Observable<Forumpost[]> {
    return this.getPostsList()
      .pipe(tap(posts => {
        posts.forEach(post => {
          if (post.pictureID) {
            this.fs.getFileUrl(post.pictureID, 'forum').subscribe(url => {
                post.pictureUrl = url;
              });
          }
        });
      }));
  }

  getPostsList() {
    return this.db.collection<Forumpost>('forumposts', ref => ref.orderBy('postDate', 'desc'))
      .snapshotChanges()
      .pipe(
        map(dcActions => {
          return dcActions.map(dcAction => {
            const data = dcAction.payload.doc.data() as Forumpost;
            const post: Forumpost = {
              id: dcAction.payload.doc.id,
              title: data.title,
              postDate: data.postDate
            };
            if (data.description) {
              post.description = data.description;
            }
            if (data.pictureID) {
              post.pictureID = data.pictureID;
            }
            return post;
          });
        })
      );
  }

  createForumDBEntry(post: Forumpost): Observable<Forumpost> {
      console.log('post: ', post);
      return from(this.db.collection('forumposts').add(post)).pipe(
        map(postRef => {
          post.id = postRef.id;
          console.log('postRef: ', postRef);
          return post;
        })
      );
  }

  deletePost(id: string): Observable<Forumpost> {
    return this.db.doc<Forumpost>('forumposts/' + id)
      .get().pipe(
        switchMap(postDocument => {
          if (!postDocument || !postDocument.data()) {
            throw new Error('Post not found');
          } else {
            return from(
              this.db.doc<Forumpost>('forumposts/' + id)
                .delete()
            ).pipe(
              map(() => {
                const data = postDocument.data() as Forumpost;
                data.id = postDocument.id;
                return data;
              })
            );
          }
        })
      );
  }
}
