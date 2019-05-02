import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DeleteForumPost, LoadForumPosts, UpdateForumPost } from 'src/app/store/actions/forumposts.actions';
import { ForumpostsState } from 'src/app/store/state/forumposts.state';

import { ForumpostUpdateDialogComponent } from '../forumpost-update-dialog/forumpost-update-dialog.component';
import { Forumpost } from '../shared/forumpost.model';
import { ForumpostsService } from '../shared/forumposts.service';


@Component({
  selector: 'app-forumposts-list',
  templateUrl: './forumposts-list.component.html',
  styleUrls: ['./forumposts-list.component.scss']
})
export class ForumpostsListComponent implements OnInit {

  @Select(ForumpostsState.forumposts) forumposts: Observable<Forumpost[]>;
  post: Forumpost;

  constructor(private store: Store, public dialog: MatDialog, private service: ForumpostsService) {
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
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result !== '') {
        updatePost.title = result;
        // this.service.updatePost(updatePost).subscribe();
        this.store.dispatch(new UpdateForumPost(updatePost));
      }
    });

  }

  deleteForumPost(forumPost: Forumpost) {
    this.store.dispatch(new DeleteForumPost(forumPost));
  }
}
