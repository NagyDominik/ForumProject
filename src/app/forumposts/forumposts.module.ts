import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatRippleModule,
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
    FlexLayoutModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRippleModule,
    MatMenuModule,
  ]
})
export class ForumpostsModule { }
