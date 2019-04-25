import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ImageCropperModule
  ]
})
export class UsersModule { }
