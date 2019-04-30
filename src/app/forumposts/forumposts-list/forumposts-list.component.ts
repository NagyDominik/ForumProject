import { Component, OnInit } from '@angular/core';
import { Forumpost } from '../shared/forumpost.model';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { LoadForumPosts, DeleteForumPost } from 'src/app/store/actions/forumposts.actions';
import { ForumpostsState } from 'src/app/store/state/forumposts.state';


@Component({
  selector: 'app-forumposts-list',
  templateUrl: './forumposts-list.component.html',
  styleUrls: ['./forumposts-list.component.scss']
})
export class ForumpostsListComponent implements OnInit {

  @Select(ForumpostsState.forumposts) forumposts: Observable<Forumpost[]>;
  @Select(ForumpostsState.loaded) loaded: Observable<boolean>;

  constructor(private store: Store) {
    this.store.dispatch(new LoadForumPosts());
  }

  ngOnInit() {
  }

  delete(post: Forumpost) {
    this.store.dispatch(new DeleteForumPost(post));
  }
}
