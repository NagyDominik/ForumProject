import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material';
import { ImageCropperModule } from 'ngx-image-cropper';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ImageCropperModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class UsersModule { }
