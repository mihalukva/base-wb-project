import { createSelector } from 'reselect';
import { initialState } from './slice';
import { LOADING_PROVIDER_STATE_NAME } from './constants';
import { LoadingProviderState, LoadingProviderStatePart } from './types';
import { LoadersDict } from '../loaders-dict';

export const LoadingProviderStateSelector = (store: LoadingProviderStatePart): LoadingProviderState =>
  store[LOADING_PROVIDER_STATE_NAME] || initialState;

export const getCurrentAreaLoading = createSelector(
  [LoadingProviderStateSelector, (state: any, area: LoadersDict | undefined) => area],
  ({ loadingAreas }: LoadingProviderState, area) => Boolean(area && loadingAreas[area]),
);
