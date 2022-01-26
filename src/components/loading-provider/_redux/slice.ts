import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadersDict } from '../loaders-dict';
import { LoadingProviderState } from './types';
import { LOADING_PROVIDER_STATE_NAME } from './constants';

export const initialState: LoadingProviderState = {
  loadingAreas: {},
};

const slice = createSlice({
  name: LOADING_PROVIDER_STATE_NAME,
  initialState,
  reducers: {
    enable: (state, { payload }: PayloadAction<LoadersDict>) => ({
      ...state,
      loadingAreas: {
        ...state.loadingAreas,
        [payload]: true,
      },
    }),
    disable: (state, { payload }: PayloadAction<LoadersDict>) => ({
      ...state,
      loadingAreas: {
        ...state.loadingAreas,
        [payload]: false,
      },
    }),
  },
});

export const loadingProviderActions = slice.actions;
export default slice.reducer;
