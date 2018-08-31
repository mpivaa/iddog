import { State } from '@app/store';

export const getToken = (state: State) => state.auth.token;
export const getError = (state: State) => state.auth.error;
export const getLoading = (state: State) => state.auth.loading;
