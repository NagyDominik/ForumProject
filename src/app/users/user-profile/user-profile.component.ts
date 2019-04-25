import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { FileService } from 'src/app/files/shared/file.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  imageChangedEvent: any = '';
  fileBeforeCrop: File;
  croppedImage: any = '';
  croppedBlob: Blob;

  constructor(private us: UserService) { }

  ngOnInit() {
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.croppedBlob = event.file;
  }

  loadFile(event) {
    this.fileBeforeCrop = event.file;
  }

  uploadFile() {
    this.us.uploadProfileImage(this.croppedBlob, this.fileBeforeCrop.type, this.fileBeforeCrop.name).subscribe();
  }
}
