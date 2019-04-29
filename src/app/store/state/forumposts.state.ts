import { Forumpost } from 'src/app/forumposts/shared/forumpost.model';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { AddForumPost } from '../actions/forumposts.actions';
import { ForumpostsService } from 'src/app/forumposts/shared/forumposts.service';
import * as forumpostsActions from '../actions/forumposts.actions';
import { asapScheduler, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface ForumpostsModel {
    forumposts: Forumpost[];
    loaded:  boolean;
    loading: boolean;
    selectedPostID: string;
}


@State<ForumpostsModel> ({
    name: 'forumposts',
    defaults: {
        forumposts: [],
        loaded: false,
        loading: false,
        selectedPostID: null
    }
})

export class ForumpostsState {
    constructor(private fps: ForumpostsService) {}

    @Selector()
    static forumposts(state: ForumpostsModel) {
        return state.forumposts;
    }

    @Selector()
    static loaded(state: ForumpostsModel) {
        return state.loaded;
    }

    @Selector()
    static selectedForumpost(state: ForumpostsModel) {
        return state.forumposts.find(
            (post: Forumpost) => post.id === state.selectedPostID
        );
    }

    // Load forumposts
    @Action(forumpostsActions.LoadForumPosts)
    loadForumposts({patchState, dispatch}: StateContext<ForumpostsModel>) {
        patchState({loading: true});
        return this.fps
        .getAllPosts()
        .pipe(
            map((forumposts: Forumpost[]) =>
            asapScheduler.schedule(() =>
                dispatch(new forumpostsActions.LoadForumPostsSuccess(forumposts))
            )),
            catchError(error =>
                of(
                    asapScheduler.schedule(() => dispatch(new forumpostsActions.LoadForumPostsFail(error))
                )
               )
            )
        );
    }

    @Action(forumpostsActions.LoadForumPostsSuccess)
    loadForumpostsSuccess({patchState}: StateContext<ForumpostsModel>, {payload}: forumpostsActions.LoadForumPostsSuccess ) {
        patchState({forumposts: payload, loaded: true, loading: false});
    }

    @Action(forumpostsActions.LoadForumPostsFail)
    loadForumpostsFail({patchState}: StateContext<ForumpostsModel>, {payload}: forumpostsActions.LoadForumPostsFail ) {
        patchState({loaded: false, loading: false});
    }

    // Add forumposts

    @Action(forumpostsActions.AddForumPost)
    AddForumPost({dispatch}: StateContext<ForumpostsModel>, {payload}: forumpostsActions.AddForumPost) {
        const stuff = this.fps.createPost(payload.post, payload.file);
        console.log('Output of createPost: ', stuff);
        return stuff.pipe(
            map((post: Forumpost) =>
                asapScheduler.schedule(() => dispatch(new forumpostsActions.AddForumPostSuccess(post))
            )),
            catchError(error =>
                of(
                    asapScheduler.schedule(() => dispatch(new forumpostsActions.AddForumPostFail(error)))
                )
            )
            );
    }

    @Action(forumpostsActions.AddForumPostSuccess)
    addForumPostSuccess({getState, patchState}: StateContext<ForumpostsModel>, {payload}: forumpostsActions.AddForumPostSuccess) {
        console.log('Added Post');
        const state = getState();
        patchState({
            forumposts: [...state.forumposts, payload]
        });
    }

    @Action(forumpostsActions.AddForumPostFail)
    addForumPostFail({getState, patchState}: StateContext<ForumpostsModel>, {payload}: forumpostsActions.AddForumPostFail) {
        // Notify the user that it failed?
    }

    // Delete forumposts

    @Action(forumpostsActions.DeleteForumPost)
    DeleteForumPost({dispatch}: StateContext<ForumpostsModel>, {payload}: forumpostsActions.DeleteForumPost) {
    }
}
