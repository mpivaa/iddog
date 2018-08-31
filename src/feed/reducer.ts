import { Action, ActionType, FetchFeedPayload } from '@app/feed/actions';
import { Error } from '@app/types';

export interface State {
  loading: boolean;
  data: FetchFeedPayload;
  error: Error | null;
}

const initialState: State = {
  loading: false,
  data: {
    category: '',
    list: [],
  },
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
      data: action.data,
      error: null,
    };
    case ActionType.FAILURE: return {
      ...state,
      loading: false,
      error: action.error,
    };
    default: return state;
  }
}

export default reducer;
