import { Action, ActionType } from '@app/auth/actions';
import { Error } from '@app/types';

export interface State {
  loading: boolean;
  token: string | null;
  error: Error | null;
}

const initialState: State = {
  loading: false,
  token: null,
  error: null,
};

function reducer(state = initialState, action: Action) {
  switch (action.type) {
    case ActionType.REQUEST: return {
      ...state,
      loading: true,
    };
    case ActionType.SUCCESS: return {
      ...state,
      loading: false,
      token: action.token,
      error: null,
    };
    case ActionType.FAILURE: return {
      ...state,
      loading: false,
      token: null,
      error: action.error,
    };
    default: return state;
  }
}

export default reducer;
