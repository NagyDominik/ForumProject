import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

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
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  save(): void {
    this.dialogRef.close(this.PostForm.value.newTitle);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
