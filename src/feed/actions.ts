import { get } from '@app/api';
import { getToken } from '@app/auth';
import { State } from '@app/store';
import { Error } from '@app/types';
import { Dispatch } from 'redux';

export interface FetchFeedPayload {
  category: string;
  list: string[];
}

export enum ActionType {
  REQUEST = 'FEED_REQUEST',
  SUCCESS = 'FEED_SUCCESS',
  FAILURE = 'FEED_FAILURE',
}

export const fetchFeedRequest = () => ({ type: ActionType.REQUEST });
export const fetchFeedSuccess = (data: FetchFeedPayload) =>
  ({ type: ActionType.SUCCESS, data });
export const fetchFeedError = (error: Error) =>
  ({ type: ActionType.FAILURE, error });

export function fetchFeed(category: string) {
  return async (dispatch: Dispatch, getState: () => State) => {
    dispatch(fetchFeedRequest());
    const token = getToken(getState());

    const { data, error } = await get<FetchFeedPayload>('/feed', {
      token: token!,
      params: {
        category,
      },
    });

    if (error) {
      return dispatch(fetchFeedError(error));
    } else {
      return dispatch(fetchFeedSuccess(data!));
    }
  };
}

export type Action =
  | { type: typeof ActionType.REQUEST }
  | { type: typeof ActionType.SUCCESS, data: FetchFeedPayload }
  | { type: typeof ActionType.FAILURE, error: Error };
