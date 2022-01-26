import { createSlice } from '@reduxjs/toolkit';
import { THEME_REDUCER_NAME } from './constants';
import { ThemeState } from './types';

export const initialState: ThemeState = {
  mode: 'light',
};

const slice = createSlice({
  name: THEME_REDUCER_NAME,
  initialState,
  reducers: {
    toggleMode: ({ mode }): ThemeState => ({
      mode: mode === 'light' ? 'dark' : 'light',
    }),
  },
});

export const themeActions = slice.actions;

export default slice.reducer;
