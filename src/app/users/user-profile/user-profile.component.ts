import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';

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

  constructor(private us: UserService) { }

  ngOnInit() {
    this.us.getProfileImage('1ffKvrnr7lj4Gu0TzpBE').subscribe(result => {
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

  uploadFile() {
    const fileBeforeCrop = this.imageChangedEvent.target.files[0];
    this.us.uploadProfileImage(this.croppedBlob, "image/png", fileBeforeCrop.name).subscribe();
  }
}
