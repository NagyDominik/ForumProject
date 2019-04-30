import { Component, OnInit } from '@angular/core';
import { Forumpost } from '../shared/forumpost.model';
import { Observable } from 'rxjs';

import { Select, Store } from '@ngxs/store';
import { LoadForumPosts, DeleteForumPost } from 'src/app/store/actions/forumposts.actions';
import { ForumpostsState } from 'src/app/store/state/forumposts.state';
import {ForumpostsService} from '../shared/forumposts.service';
import {MatSnackBar} from '@angular/material';
import { post } from 'selenium-webdriver/http';



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
    this.store.dispatch(new DeleteForumPost(forumPost));
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }
}
