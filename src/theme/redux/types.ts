import { PaletteMode } from '@mui/material';
import { THEME_REDUCER_NAME } from './constants';

export type ThemeState = { mode: PaletteMode };

export type ThemeStatePart = {
  [THEME_REDUCER_NAME]: ThemeState;
};
