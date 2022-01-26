import { createTheme } from '@mui/material';
import { components } from './components';
import { darkPalette } from './dark-palette';
import { lightPalette } from './light-palette';

declare module '@mui/material/styles' {
  interface Palette {
    sideMenu?: Palette['primary'];
  }
  interface PaletteOptions {
    sideMenu?: PaletteOptions['primary'];
  }
}

export const getTheme = (mode: string) =>
  createTheme({
    palette: mode === 'light' ? lightPalette : darkPalette,
    components,
  });
