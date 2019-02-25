import { Component, OnInit } from '@angular/core';
import { Forumpost } from '../shared/forumpost.model';
import { ForumpostsService } from '../shared/forumposts.service';
import { tap } from 'rxjs/operators';
import { FileService } from 'src/app/files/shared/file.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-forumposts-list',
  templateUrl: './forumposts-list.component.html',
  styleUrls: ['./forumposts-list.component.scss']
})
export class ForumpostsListComponent implements OnInit {

  forumposts: Observable<Forumpost[]>;

  constructor(private fps: ForumpostsService, private fs: FileService) { }

  ngOnInit() {
    this.forumposts = this.fps.getAllPosts().pipe(
      tap(posts => {
        posts.forEach(post => {
          if (post.imgID) {
            this.fs.getFileUrl(post.imgID).subscribe(url => {
              post.imgUrl = url;
            })
          }
        })
      })
    )
  }

}
