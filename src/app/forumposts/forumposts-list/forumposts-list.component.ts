import { Component, OnInit } from '@angular/core';
import { Forumpost } from '../shared/forumpost.model';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { LoadForumPosts } from 'src/app/store/actions/forumposts.actions';


@Component({
  selector: 'app-forumposts-list',
  templateUrl: './forumposts-list.component.html',
  styleUrls: ['./forumposts-list.component.scss']
})
export class ForumpostsListComponent implements OnInit {

  forumposts: Observable<Forumpost>;

  // constructor(private fps: ForumpostsService, private fs: FileService) { }

  constructor(private store: Store) {
    this.store.dispatch(new LoadForumPosts());
    this.forumposts = this.store.select(state => state.forumposts.forumposts);
}

  ngOnInit() {
  }

}
