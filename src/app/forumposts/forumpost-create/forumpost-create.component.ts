import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/files/shared/file.service';

@Component({
  selector: 'app-forumpost-create',
  templateUrl: './forumpost-create.component.html',
  styleUrls: ['./forumpost-create.component.scss']
})
export class ForumpostCreateComponent implements OnInit {

  constructor(private fs: FileService) { }

  ngOnInit() {
  }

  uploadFile(event) {
    const file = event.target.files[0];
    this.fs.upload(file).subscribe( picture =>{
      window.alert('File upload was successful!');
    });
  }
}
