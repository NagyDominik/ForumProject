import { Component, OnInit } from '@angular/core';
import { Forumpost } from '../shared/forumpost.model';
import { Observable } from 'rxjs';

import { Select, Store } from '@ngxs/store';
import { LoadForumPosts } from 'src/app/store/actions/forumposts.actions';
import { ForumpostsState } from 'src/app/store/state/forumposts.state';
import {ForumpostsService} from '../shared/forumposts.service';



@Component({
  selector: 'app-forumposts-list',
  templateUrl: './forumposts-list.component.html',
  styleUrls: ['./forumposts-list.component.scss']
})
export class ForumpostsListComponent implements OnInit {

  @Select(ForumpostsState.forumposts) forumposts: Observable<Forumpost[]>;
  constructor(private store: Store,private fps: ForumpostsService) {
     this.store.dispatch(new LoadForumPosts());
}

  ngOnInit() {
  }

  deleteForumPost(forumPost: Forumpost) {
    const obs = this.fps.deletePost(forumPost.id);
    obs.subscribe(postFromFirebase => {
      window.alert('post with id: ' + postFromFirebase.id + ' is deleted');
    }, error1 => {
      window.alert('post not found with id: ' + forumPost.id);
    });
  }
}
