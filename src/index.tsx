import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector } from 'react-redux';
import { RouterProvider } from 'react-router5';
import { ThemeProvider } from '@mui/material';
import { MAX_SNACK_COUNT } from 'constants/ui';
import { SnackbarProvider } from 'notistack';
import { ConnectedPage } from 'components/';
import { themeModeSelector } from 'theme/redux';
import { DialogProvider } from 'components';
import { router } from './router';
import { store } from './store';
import { getTheme } from './theme/get-theme';
import 'normalize.css';
import './styles/global.scss';

router.start();

const ROOT_ELEMENT = document.getElementById('root');

const ConnectedThemeProvider = () => {
  const mode = useSelector(themeModeSelector);
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={MAX_SNACK_COUNT}>
        <RouterProvider router={router}>
          <DialogProvider>
            <ConnectedPage />
          </DialogProvider>
        </RouterProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

const App = () => (
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedThemeProvider />
    </Provider>
  </React.StrictMode>
);

ReactDOM.render(<App />, ROOT_ELEMENT);
