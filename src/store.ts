import { reducer as authReducer, State as AuthState } from '@app/auth';
import { reducer as feedReducer, State as FeedState } from '@app/feed';
import { connectRouter, history, routerMiddleware, RouterState } from '@app/router';
import { applyMiddleware, combineReducers, createStore, Action, Reducer } from 'redux';
import thunk from 'redux-thunk';

export interface State {
  auth: AuthState;
  feed: FeedState;
  router: RouterState;
}

const reducer = connectRouter(history)(combineReducers({
  auth: authReducer,
  feed: feedReducer
})) as Reducer<State & { router: RouterState }>;

const state: State = localStorage.getItem('state') ?
  JSON.parse(localStorage.getItem('state')!) :
  {};

export const store = createStore<State, Action<any>, {}, {}>(
  reducer,
  state,
  applyMiddleware(
    thunk,
    routerMiddleware(history),
  ),
);

store.subscribe(() => {
  localStorage.setItem('state', JSON.stringify(store.getState()));
});

export default store;
