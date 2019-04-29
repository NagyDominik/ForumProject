import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatRippleModule,
  MatTabsModule,
  MatSnackBarModule,
} from '@angular/material';

import { ForumpostCreateComponent } from './forumpost-create/forumpost-create.component';
import { ForumpostsListComponent } from './forumposts-list/forumposts-list.component';
import { ForumpostsRoutingModule } from './forumposts-routing.module';

@NgModule({
  declarations: [ForumpostCreateComponent, ForumpostsListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ForumpostsRoutingModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRippleModule,
    MatMenuModule,
    MatTabsModule,
    MatSnackBarModule,

  ]
})
export class ForumpostsModule { }
