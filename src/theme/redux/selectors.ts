import { createSelector } from 'reselect';
import { PaletteMode } from '@mui/material';
import { ThemeStatePart, ThemeState } from './types';
import { THEME_REDUCER_NAME } from './constants';
import { initialState } from './slice';

export const themeSelector = (state: ThemeStatePart): ThemeState => state[THEME_REDUCER_NAME] || initialState;

export const themeModeSelector = createSelector(
  [themeSelector],
  ({ mode }: ThemeState): PaletteMode => mode || 'light',
);
