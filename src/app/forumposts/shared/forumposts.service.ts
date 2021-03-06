import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { FileService } from 'src/app/files/shared/file.service';

import { Forumpost } from './forumpost.model';

@Injectable({
  providedIn: 'root'
})
export class ForumpostsService {

  constructor(private db: AngularFirestore, private fs: FileService) { }

  /**
   * @param post The title and (optional) description of a forum post.
   * @param file (Optional) Image to upload.
   */
  createPost(post: Forumpost, file: File): Observable<Forumpost> {
    if (file) {
      return this.createPostWithImage(post, file);
    } else {
      return this.createTextPost(post);
    }
  }

  /**
   * Creates a text post with the current time appended.
   * @param post The post that will be saved.
   */
  createTextPost(post: Forumpost): Observable<Forumpost> {
    const postProcessed: Forumpost = {
      title: post.title,
      postDate: new Date(Date.now()).toISOString()
    };

    if (post.description) {
      postProcessed.description = post.description;
    }

    return this.createForumDBEntry(postProcessed);
  }

/**
 * Uploads the image and cretes apost with the current time appended.
 * @param post The post (only title).
 * @param file The image that will be saved.
 */
  createPostWithImage(post: Forumpost, file: File): Observable<Forumpost> {
    const postProcessed: Forumpost = {
      title: post.title,
      postDate: new Date(Date.now()).toISOString()
    };

    this.fs.uploadImage(file, 'forum').subscribe(data => {
      postProcessed.pictureID = data.id;
      this.createForumDBEntry(postProcessed);
    });

    return of(postProcessed);
  }

  /**
   * Retrieve the list of posts.
   * If the post contains an image, also retrieve the picture URL.
   */
   getAllPosts(): Observable<Forumpost[]> {
    return this.getPostsList()
      .pipe(
        tap(posts => {
          posts.forEach(post => {
            if (post.pictureID) {
              this.fs.getFileUrl(post.pictureID, 'forum').subscribe(url => {
                post.pictureUrl = url;
              });
            }
          });
        })
      );
  }

  /**
   * Rettrieve a list of forumpost, without the picture URL.
   */
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

  /**
   * Create a database entry for the post, and retrieve the ID.
   * @param post The post that will be saved.
   */
  createForumDBEntry(post: Forumpost): Observable<Forumpost> {
    return from(this.db.collection('forumposts').add(post)).pipe(
      map(postRef => {
        post.id = postRef.id;
        return post;
      })
    );
  }

  /**
   * Delete a post with the given ID.
   * @param id The ID of the post that will be deleted.
   */
  deletePost(id: string): Observable<Forumpost> {
    return this.db.doc<Forumpost>('forumposts/' + id).get().pipe(
      switchMap(postDocument => {
        if (!postDocument || !postDocument.data()) {
          throw new Error('Post not found');
        } else {
          return from(this.db.doc<Forumpost>('forumposts/' + id).delete()).pipe(
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

  /**
   * Update a post (title only)
   * @param post The post that will be updated.
   */
  updatePost(post: Forumpost): Observable<Forumpost> {
    if (post != null) {
      return this.db.doc<Forumpost>('forumposts/' + post.id).get().pipe(
        switchMap(postDoc => {
          if (!postDoc || !postDoc.data()) {
            throw new Error('Post not found');
          } else {
            return from(this.db.doc<Forumpost>('forumposts/' + post.id).update(post)).pipe(
              map(() => {
                const data = postDoc.data() as Forumpost;
                data.id = postDoc.id;
                data.title = post.title;
                return data;
              })
            );
          }
        })
      );
    } else {
      return Observable.create(() => { throw new Error('Update data cannot be null'); });
    }
  }

}
