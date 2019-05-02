import { Observable, of } from 'rxjs';
import { FileMeta } from 'src/app/files/shared/file-meta.model';
import { User } from 'src/app/users/shared/user.model';

export class FunctionHelper {
  id = 'fuiwehfvsdhgfoew';
  actions: any[] = [];
  docSnapshot: any;

  getUserWithProfilePicId(img: boolean): Observable<any> {
    const temp = {
      payload: {
        id: this.id,
        data: () => { },
      }
    };
    if (img) {
      temp.payload.data = () => {
        return {
          username: 'testUser',
          regDate: new Date(Date.now()).toISOString(),
          profilePicId: 'asd',
        };
      };
    } else {
      temp.payload.data = () => {
        return {
          username: 'testUser',
          regDate: new Date(Date.now()).toISOString(),
        };
      };
    }

    return of(temp);
  }

  getUserWithProfilePicUrl(): Observable<User> {
    return of(
      {
        id: 'fuiwehfvsdhgfoew',
        username: 'testUser',
        regDate: new Date(Date.now()).toISOString(),
        profilePicUrl: 'http://www.visitfranklinsouthamptonva.com/media/95251/testing.jpg'
      }
    );
  }

  getFileMeta(): Observable<FileMeta> {
    return of(
      {
        name: 'Test',
        type: 'image/png',
        size: 1500,
      }
    );
  }

  getEventWithFile(picture: boolean): any {
    let type: string;
    if (picture) {
      type = 'image/png';
    } else {
      type = 'gnp/egami';
    }
    return {
      target: {
        files: [
          {
            type: type,
          }
        ]
      },
      file: {},
      base64: 'base64',
    };
  }

  getSnapshotChangeDocChangeActions(amount: number): Observable<any[]> {
    for (let i = 0; i < amount; i++) {
      let data: any;
      if (i % 2 === 0) {
        data = {
          title: 'asd' + i,
          postDate: 'date' + i,
          pictureID: 'picID'
        };
      } else {
        data = {
          title: 'asd' + i,
          postDate: 'date' + i,
          description: 'description',
        };
      }
      this.actions.push({
        payload: {
          doc: {
            id: 'abc' + i,
            data: () => {
              return data;
            }
          }
        }
      });
    }
    return of(this.actions);
  }

  getForumpostDocSnapshot(num: number): Observable<any> {
    if (num === 0) {
      this.docSnapshot = {
        id: 'asdasdas',
        data: () => {
          return;
        }
      };
    } else {
      this.docSnapshot = {
        id: 'asdasdas',
        data: () => {
          return {
            title: 'asd',
            postDate: 'date',
          };
        }
      };
    }
    return of(this.docSnapshot);
  }

  getFSImageUpload(): Observable<any> {
    return of({
      id: 'test',
    });
  }

  getFileMock(): File {
    const blobmock: Blob[] = [new Blob(['content'], { type: 'image/png' })];
    return new File(blobmock, 'testFile', {
      lastModified: 1505948,
      type: 'image/png',
    });
  }
}
