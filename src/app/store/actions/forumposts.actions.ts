import { Forumpost } from '../../forumposts/shared/forumpost.model';


export class LoadForumPosts {
    static readonly type = '[Forumposts] Load Forumposts';
}

export class LoadForumPostsSuccess {
    static readonly type = '[Forumposts] Load Forumposts Success';

    constructor(public readonly payload: Forumpost[]) {}
}


export class LoadForumPostsFail {
    static readonly type = '[Forumposts] Load Forumposts Fail';

    constructor(public readonly payload?: any) {}
}

export class AddForumPost {
    static readonly type = '[Forumpost] Add Forumpost';

    constructor(public payload: {post: Forumpost, file: File} ) {}
}

export class AddForumPostSuccess {
    static readonly type = '[Forumpost] Add Forumpost Success';

    constructor(public payload: Forumpost) {}
}

export class AddForumPostFail {
    static readonly type = '[Forumpost] Add Forumpost Fail';

    constructor(public payload?: Forumpost) {}
}

export class DeleteForumPost {
    static readonly type = '[Forumpost] Delete Forumpost';

    constructor(public payload: Forumpost) {}
}


export class DeleteForumPostSuccess {
    static readonly type = '[Forumpost] Delete Forumpost Success';

    constructor(public payload: Forumpost) {}
}

export class DeleteForumPostFail {
    static readonly type = '[Forumpost] Delete Forumpost Fail';

    constructor(public payload?: any) {}
}

export class UpdateForumPost {
    static readonly type = '[Forumpost] Update Forumpost';

    constructor(public payload: Forumpost) {}
}

export class UpdateForumPostSuccess {
    static readonly type = '[Forumpost] Update Forumpost Success';

    constructor(public payload: Forumpost) {}
}

export class UpdateForumPostFail {
    static readonly type = '[Forumpost] Update Forumpost Fail';

    constructor(public payload: Forumpost) {}
}

export type ForumpostsActions =
| LoadForumPosts
| LoadForumPostsSuccess
| LoadForumPostsFail
| AddForumPost
| AddForumPostSuccess
| AddForumPostFail
| DeleteForumPost
| DeleteForumPostSuccess
| DeleteForumPostFail
| UpdateForumPost
| UpdateForumPostSuccess
| UpdateForumPostFail;
