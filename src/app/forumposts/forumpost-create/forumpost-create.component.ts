import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AddForumPost } from 'src/app/store/actions/forumposts.actions';

import { Forumpost } from '../shared/forumpost.model';

@Component({
  selector: 'app-forumpost-create',
  templateUrl: './forumpost-create.component.html',
  styleUrls: ['./forumpost-create.component.scss']
})
export class ForumpostCreateComponent implements OnInit, AfterViewInit {

  PostForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  });

  fileToUpload: File;
  imgURL: any;

  constructor(private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  clear() {
    this.PostForm.reset();
    this.fileToUpload = null;
  }

  setUploadFile(event) {
    if (event.target.files[0].type.includes('image')) {
      this.fileToUpload = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.fileToUpload);
      reader.onload = () => {
        this.imgURL = reader.result;
      };
    } else {
      this.snackBar.open('Only image files are accepted', 'OK', {
        duration: 3000
      });
    }
  }

  post() {
    const post: Forumpost = this.PostForm.value;
    if ((post.title != null && post.title !== '') && (this.fileToUpload == null || this.fileToUpload.type.includes('image'))) {
      const file = this.fileToUpload;
      this.store.dispatch(new AddForumPost({post, file}));
      this.back();
    } else {
      this.snackBar.open('Cannot create post without title', 'OK', {
        duration: 3000
      });
    }
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

}
