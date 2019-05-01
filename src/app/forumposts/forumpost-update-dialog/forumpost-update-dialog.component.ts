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
    const post: Forumpost = this.PostForm.value;

    this.dialogRef.close('you pressed save btn');
  }

  cancel(): void {

    this.dialogRef.close(this.data);
  }

  ngOnInit() {
  }

}
