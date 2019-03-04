import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/files/shared/file.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Forumpost } from '../shared/forumpost.model';
import { ForumpostsService } from '../shared/forumposts.service';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(private fps: ForumpostsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  setUploadFile(event) {
    this.fileToUpload = event.target.files[0];
  }

  post() {
    const post: Forumpost = this.PostForm.value;
    this.fps.createPost(post, this.fileToUpload);
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

}
