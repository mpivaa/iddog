import { Dispatch } from 'redux';
import { post } from '@app/api';
import { push } from '@app/router';
import { Error } from '@app/types';

export enum ActionType {
  REQUEST = 'AUTH_REQUEST',
  SUCCESS = 'AUTH_SUCCESS',
  FAILURE = 'AUTH_FAILURE',
}

export const authRequest = () => ({ type: ActionType.REQUEST });
export const authSuccess = (token: string) => ({ type: ActionType.SUCCESS, token });
export const authError = (error: Error) => ({ type: ActionType.FAILURE, error });

interface SignUpPayload {
  user: {
    token: string,
  };
}

export function signUp(email: string) {
  return async (dispatch: Dispatch) => {
    dispatch(authRequest());
    const { data, error } = await post<SignUpPayload>('/signup', {
      params: {
        email,
      },
    });

    if (error) {
      return dispatch(authError(error));
    } else {
      dispatch(authSuccess(data!.user.token));
      return dispatch(push('/feed'));
    }
  };
}

export type Action =
  | { type: typeof ActionType.REQUEST }
  | { type: typeof ActionType.SUCCESS, token: string }
  | { type: typeof ActionType.FAILURE, error: Error };
