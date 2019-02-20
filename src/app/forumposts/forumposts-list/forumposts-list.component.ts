import { Component, OnInit } from '@angular/core';
import { Forumpost } from '../shared/forumpost.model';

@Component({
  selector: 'app-forumposts-list',
  templateUrl: './forumposts-list.component.html',
  styleUrls: ['./forumposts-list.component.scss']
})
export class ForumpostsListComponent implements OnInit {

  forumpost: Forumpost;

  constructor() { }

  ngOnInit() {
  }

}
