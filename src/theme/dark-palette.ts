import createPalette from '@mui/material/styles/createPalette';

export const darkPalette = createPalette({
  mode: 'dark',
  primary: {
    main: '#004d40',
  },
  secondary: {
    main: '#f50057',
  },
  background: {
    default: '#303030',
    paper: '#424242',
  },
  text: {
    primary: '#fff',
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
  },
  sideMenu: {
    main: '#004d40',
    light: '#337066',
    dark: 'rgb(0, 53, 44)',
    contrastText: '#fff',
  },
});
