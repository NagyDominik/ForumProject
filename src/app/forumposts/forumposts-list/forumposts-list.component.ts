import { Component, OnInit } from '@angular/core';
import { Forumpost } from '../shared/forumpost.model';
import { Observable } from 'rxjs';

import { Select, Store } from '@ngxs/store';
import { LoadForumPosts, DeleteForumPost } from 'src/app/store/actions/forumposts.actions';
import { ForumpostsState } from 'src/app/store/state/forumposts.state';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ForumpostUpdateDialogComponent} from '../forumpost-update-dialog/forumpost-update-dialog.component';

@Component({
  selector: 'app-forumposts-list',
  templateUrl: './forumposts-list.component.html',
  styleUrls: ['./forumposts-list.component.scss']
})
export class ForumpostsListComponent implements OnInit {

  @Select(ForumpostsState.forumposts) forumposts: Observable<Forumpost[]>;
  constructor(private store: Store, public dialog: MatDialog) {
     this.store.dispatch(new LoadForumPosts());
}

  ngOnInit() {
  }

  openDialog(updatePost: Forumpost): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(ForumpostUpdateDialogComponent, {
      data: updatePost,
      disableClose: true,
      autoFocus: true,
      width: '350px',
      }
    );

    dialogRef.afterClosed().subscribe(result =>
      result = updatePost.title
    );
  }

  deleteForumPost(forumPost: Forumpost) {
    this.store.dispatch(new DeleteForumPost(forumPost));
  }
}
