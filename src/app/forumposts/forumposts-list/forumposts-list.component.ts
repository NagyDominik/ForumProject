import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DeleteForumPost, LoadForumPosts } from 'src/app/store/actions/forumposts.actions';
import { ForumpostsState } from 'src/app/store/state/forumposts.state';

import { Forumpost } from '../shared/forumpost.model';

@Component({
  selector: 'app-forumposts-list',
  templateUrl: './forumposts-list.component.html',
  styleUrls: ['./forumposts-list.component.scss']
})
export class ForumpostsListComponent implements OnInit {

  @Select(ForumpostsState.forumposts) forumposts: Observable<Forumpost[]>;
  constructor(private store: Store, public snackBar: MatSnackBar) {
    this.store.dispatch(new LoadForumPosts());
  }

  ngOnInit() {
  }

  deleteForumPost(forumPost: Forumpost) {
    this.store.dispatch(new DeleteForumPost(forumPost));
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }
}
