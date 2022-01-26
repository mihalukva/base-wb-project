import loadingProviderReducer, { LOADING_PROVIDER_STATE_NAME } from 'components/loading-provider';
import { SNACKBAR_REDUCER_NAME } from 'redux/snackbar';
import snackbarReducer from 'redux/snackbar/slice';
import themeReducer, { THEME_REDUCER_NAME } from 'theme/redux';
import userReducer, { USER_REDUCER_NAME } from 'pages/login/redux';
import { router5Reducer } from '../router';

export const rootReducers = {
  router: router5Reducer,
  [SNACKBAR_REDUCER_NAME]: snackbarReducer,
  [LOADING_PROVIDER_STATE_NAME]: loadingProviderReducer,
  [THEME_REDUCER_NAME]: themeReducer,
  [USER_REDUCER_NAME]: userReducer,
};
