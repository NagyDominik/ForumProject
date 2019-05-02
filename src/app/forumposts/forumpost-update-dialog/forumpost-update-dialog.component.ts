import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup} from '@angular/forms';
import {Forumpost} from '../shared/forumpost.model';

@Component({
  selector: 'app-forumpost-update-dialog',
  templateUrl: './forumpost-update-dialog.component.html',
  styleUrls: ['./forumpost-update-dialog.component.scss']
})
export class ForumpostUpdateDialogComponent implements OnInit {

  PostForm = new FormGroup({
    newTitle: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<ForumpostUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  save(): void {
    // const postWithNewTitle: Forumpost = this.PostForm.value;
    const postWithNewTitle: Forumpost = {id: this.data.id, title: this.PostForm.value.newTitle, postDate: this.data.postDate};
    if (this.data.pictureID) {
      postWithNewTitle.pictureID = this.data.pictureID;
    }
    if (this.data.description) {
      postWithNewTitle.description = this.data.description;
    }
    if (this.data.pictureUrl) {
      postWithNewTitle.pictureUrl = this.data.pictureUrl;
    }
    this.dialogRef.close(postWithNewTitle);
  }

  cancel(): void {

    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
