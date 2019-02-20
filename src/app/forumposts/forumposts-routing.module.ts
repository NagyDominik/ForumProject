import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForumpostCreateComponent } from './forumpost-create/forumpost-create.component';

const routes: Routes = [
  {
    path: '',
    component: ForumpostCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumpostsRoutingModule { }