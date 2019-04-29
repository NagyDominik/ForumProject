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


  constructor(private fps: ForumpostsService) { }

  constructor(private store: Store) {
     this.store.dispatch(new LoadForumPosts());
}

  ngOnInit() {
  }

}
