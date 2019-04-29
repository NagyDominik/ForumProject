import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Forumpost } from '../shared/forumpost.model';
import { ForumpostsService } from '../shared/forumposts.service';

@Component({
  selector: 'app-forumposts-list',
  templateUrl: './forumposts-list.component.html',
  styleUrls: ['./forumposts-list.component.scss']
})
export class ForumpostsListComponent implements OnInit {

  forumposts: Observable<Forumpost[]>;

  constructor(private fps: ForumpostsService) { }

  ngOnInit() {
    this.forumposts = this.fps.getAllPosts();
  }

}
