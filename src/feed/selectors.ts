import { getQuery } from '@app/router';
import { State } from '@app/store';

export const getDataList = (state: State) => state.feed.data.list;
export const getError = (state: State) => state.feed.error;
export const getCategory = (state: State, initialValue: string): string =>
  getQuery(state).category || initialValue;
export const getId = (state: State): string =>
  getQuery(state).id;
