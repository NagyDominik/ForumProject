import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { FileService } from 'src/app/files/shared/file.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedBlob: Blob;

  constructor() { }

  ngOnInit() {
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.croppedBlob = event.file;
  }

  uploadFile(event) {
    this.imageChangedEvent = event;
  }
}
