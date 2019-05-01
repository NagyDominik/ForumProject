import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ImageCroppedEvent } from 'ngx-image-cropper';

import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  currentUser: User;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedBlob: Blob;
  fileToUpload: File;

  constructor(private us: UserService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.us.getUserWithProfilePic('1ffKvrnr7lj4Gu0TzpBE').subscribe(result => {
      this.currentUser = result;
    });
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.croppedBlob = event.file;
  }

  loadFile(event) {
    this.imageChangedEvent = event;
  }

  setUploadFile(event) {
    if (event.target.files[0].type.includes('image')) {
      this.fileToUpload = event.target.files[0];
      this.loadFile(event);
    } else {
      this.snackBar.open('Only image files are accepted', 'OK', {
        duration: 3000
      });
    }
  }

  uploadFile() {
    const fileBeforeCrop = this.imageChangedEvent.target.files[0];
    this.us.uploadProfileImage(this.croppedBlob, 'image/png', fileBeforeCrop.name).subscribe(() => {
      this.getCurrentUser();
      this.imageChangedEvent = '';
      this.croppedImage = '';
      this.fileToUpload = null;
      this.snackBar.open('Profile picture has been updated!', 'OK', {
        duration: 3000,
      });
    });
  }
}
