import { Forumpost } from 'src/app/forumposts/shared/forumpost.model';
import { State, Selector, Action, StateContext, Actions } from '@ngxs/store';
import { patch, updateItem } from '@ngxs/store/operators';
import { ForumpostsService } from 'src/app/forumposts/shared/forumposts.service';
import * as forumpostsActions from '../actions/forumposts.actions';
import { asapScheduler, of } from 'rxjs';
import { map, catchError, filter } from 'rxjs/operators';

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
        // TODO: use these for something, or remove them
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
        /*return this.fps.createPost(payload.post, payload.file).pipe(
        map((post: Forumpost) =>
            asapScheduler.schedule(() => dispatch(new forumpostsActions.AddForumPostSuccess(post))
        )),
        catchError(error =>
            of(
                asapScheduler.schedule(() => dispatch(new forumpostsActions.AddForumPostFail(error)))
            )
        )
        );*/
        if (payload.file) {
            return this.fps.createPostWithImage(payload.post, payload.file).pipe(
                map((post: Forumpost) =>
                    asapScheduler.schedule(() => dispatch(new forumpostsActions.AddForumPostSuccess(post))
                )),
                catchError(error =>
                    of(
                        asapScheduler.schedule(() => dispatch(new forumpostsActions.AddForumPostFail(error)))
                    )
                )
                );
        } else {
            return this.fps.createPost(payload.post).pipe(
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
    deleteForumPost({dispatch}: StateContext<ForumpostsModel>, {payload}: forumpostsActions.DeleteForumPost) {
        return this.fps.deletePost(payload.id).pipe(
            map((post: Forumpost) =>
                asapScheduler.schedule(() => dispatch(new forumpostsActions.DeleteForumPostSuccess(post))
            )),
        catchError(error =>
            of(
                asapScheduler.schedule(() => dispatch(new forumpostsActions.DeleteForumPostFail(error))
            )
            )
        ));
    }

    @Action(forumpostsActions.DeleteForumPostSuccess)
    deleteForumPostSuccess({getState, setState}: StateContext<ForumpostsModel>, {payload}: forumpostsActions.DeleteForumPostSuccess) {
        const state = getState();
        const filtered = state.forumposts.filter(post => post.id !== payload.id);
        setState({...state, forumposts: filtered});
    }

    @Action(forumpostsActions.DeleteForumPostFail)
    deleteForumPostFail({getState, patchState}: StateContext<ForumpostsModel>, {payload}: forumpostsActions.DeleteForumPostFail) {

    }

    // Update forumpost
    @Action(forumpostsActions.UpdateForumPost)
    updateForumPost({dispatch}: StateContext<ForumpostsModel>, {payload}: forumpostsActions.UpdateForumPost) {
        return this.fps.updatePost(payload).pipe(
            map((returnPost: Forumpost) =>
            // tslint:disable-next-line:max-line-length
            asapScheduler.schedule(() => dispatch(new forumpostsActions.UpdateForumPostSuccess(payload)) // TODO: updatePost() return a Forumpost instance with the old information, so use the payload to update the state
        )),
            catchError(error =>
        of(
            asapScheduler.schedule(() => dispatch(new forumpostsActions.UpdateForumPostFail(error))
            )
        )
    ));
    }

    @Action(forumpostsActions.UpdateForumPostSuccess)
    updateForumPostSuccess({getState, setState}: StateContext<ForumpostsModel>, {payload}: forumpostsActions.UpdateForumPostSuccess) {
        setState(patch({
            forumposts: updateItem<Forumpost>(post => post.id === payload.id, payload)
        }));
    }

    @Action(forumpostsActions.UpdateForumPostFail)
    updateForumpostFail({getState, patchState}: StateContext<ForumpostsModel>, {payload}: forumpostsActions.DeleteForumPostFail) {

    }

}
