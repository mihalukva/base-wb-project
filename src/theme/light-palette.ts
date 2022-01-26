import createPalette from '@mui/material/styles/createPalette';

export const lightPalette = createPalette({
  mode: 'light',
  primary: {
    main: '#004d40',
  },
  secondary: {
    main: '#f50057',
  },
  sideMenu: {
    main: '#004d40',
    light: '#337066',
    dark: 'rgb(0, 53, 44)',
    contrastText: '#fff',
  },
});
