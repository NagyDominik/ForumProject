import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ForumpostCreateComponent } from './forumpost-create/forumpost-create.component';
import { ForumpostsRoutingModule } from './forumposts-routing.module';
import { ForumpostsListComponent } from './forumposts-list/forumposts-list.component';
import { MatCardModule, MatIconModule } from '@angular/material';

@NgModule({
  declarations: [ForumpostCreateComponent, ForumpostsListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ForumpostsRoutingModule,
    MatCardModule,
    MatIconModule,
  ]
})
export class ForumpostsModule { }