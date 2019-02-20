import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Forumpost } from './forumpost.model';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForumpostsService {

  constructor(private db: AngularFirestore) { }

  createPost(post: Forumpost): Observable<Forumpost> {
    let postProcessed: Forumpost = {
      title: post.title,
      postDate: post.postDate
    };
    if (post.description) {
      postProcessed.description = post.description;
    }
    if (post.imgID) {
      postProcessed.imgID = post.imgID;
    }
    return from(this.db.collection('forumposts').add(postProcessed)
    ).pipe(
      map(postRef => {
        post.id = postRef.id;
        return post;
      })
    )
  }

}
