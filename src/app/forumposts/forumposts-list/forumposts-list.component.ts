import { Component, OnInit } from '@angular/core';
import { Forumpost } from '../shared/forumpost.model';
import { Observable } from 'rxjs';

import { Select, Store } from '@ngxs/store';
import { LoadForumPosts } from 'src/app/store/actions/forumposts.actions';
import { ForumpostsState } from 'src/app/store/state/forumposts.state';
import {ForumpostsService} from '../shared/forumposts.service';
import {MatSnackBar} from '@angular/material';



@Component({
  selector: 'app-forumposts-list',
  templateUrl: './forumposts-list.component.html',
  styleUrls: ['./forumposts-list.component.scss']
})
export class ForumpostsListComponent implements OnInit {

  @Select(ForumpostsState.forumposts) forumposts: Observable<Forumpost[]>;
  constructor(private store: Store, private fps: ForumpostsService,  public snackBar: MatSnackBar) {
     this.store.dispatch(new LoadForumPosts());
}

  ngOnInit() {
  }

  deleteForumPost(forumPost: Forumpost) {
    const obs = this.fps.deletePost(forumPost.id);
    obs.subscribe(postFromFirebase => {
      this.openSnackBar('post with title: ' + postFromFirebase.title + ' is deleted');
    }, error1 => {
      this.openSnackBar('post not found with title: ' + forumPost.title);
    });
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }
}
