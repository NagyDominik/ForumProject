import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Forumpost } from '../shared/forumpost.model';
import { ForumpostsService } from '../shared/forumposts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { AddForumPost } from 'src/app/store/actions/forumposts.actions';

@Component({
  selector: 'app-forumpost-create',
  templateUrl: './forumpost-create.component.html',
  styleUrls: ['./forumpost-create.component.scss']
})
export class ForumpostCreateComponent implements OnInit {

  PostForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  });

  fileToUpload: File;
  imgURL: any;

  constructor(private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  clear() {
    this.PostForm.reset();
  }

  setUploadFile(event) {
    this.fileToUpload = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);
    reader.onload = () => {
      this.imgURL = reader.result;
    };
  }

  post() {
    const post: Forumpost = this.PostForm.value;
    // this.fps.createPost(post, this.fileToUpload);
    const file = this.fileToUpload;
    const payload = {post, file};
    this.store.dispatch(new AddForumPost(payload));
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

}
