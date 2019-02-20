import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/files/shared/file.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Forumpost } from '../shared/forumpost.model';
import { ForumpostsService } from '../shared/forumposts.service';

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

  constructor(private fs: FileService, private fps: ForumpostsService) { }

  ngOnInit() {
  }

  setUploadFile(event) {
    this.fileToUpload = event.target.files[0];
  }

  post() {
    let post: Forumpost = this.PostForm.value;
    post.postDate = Date.now();
    if (this.fileToUpload) {
      this.fs.upload(this.fileToUpload).subscribe(picture => {
        post.imgID = picture.id;
      });
    }
    debugger
    this.fps.createPost(post);
  }

  uploadFile() {
    this.fs.upload(this.fileToUpload).subscribe(picture => {
      window.alert('File upload was successful!');
    });
  }
}
