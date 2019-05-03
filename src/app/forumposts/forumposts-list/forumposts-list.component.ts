import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DeleteForumPost, LoadForumPosts, UpdateForumPost } from 'src/app/store/actions/forumposts.actions';
import { ForumpostsState } from 'src/app/store/state/forumposts.state';

import { ForumpostUpdateDialogComponent } from '../forumpost-update-dialog/forumpost-update-dialog.component';
import { Forumpost } from '../shared/forumpost.model';

@Component({
  selector: 'app-forumposts-list',
  templateUrl: './forumposts-list.component.html',
  styleUrls: ['./forumposts-list.component.scss']
})
export class ForumpostsListComponent implements OnInit {

  @Select(ForumpostsState.forumposts) forumposts: Observable<Forumpost[]>;
  dialogConfig: MatDialogConfig;
  dialogRef: any;

  constructor(private store: Store, public dialog: MatDialog) {
    this.store.dispatch(new LoadForumPosts());
  }

  ngOnInit() {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
  }

  /**
   * Open a dialog window that can be used to update an existing post's title.
   * @param updatePost The post being updated
   */
  openDialog(updatePost: Forumpost): void {
    this.dialogRef = this.dialog.open(ForumpostUpdateDialogComponent, {
      data: updatePost,
      disableClose: true,
      autoFocus: true,
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if (result != null && result !== '') {
        updatePost.title = result;
        this.store.dispatch(new UpdateForumPost(updatePost)); // If the user didn't cancel the update, dispatch a new NGXS action
      }
    });
  }

  deleteForumPost(forumPost: Forumpost) {
    this.store.dispatch(new DeleteForumPost(forumPost));
  }
}
