import { SNACKBAR_REDUCER_NAME } from './constants';
import { SnackbarStatePartType } from './types';

export const notificationsSelector = (state: SnackbarStatePartType) => state[SNACKBAR_REDUCER_NAME].notifications || [];
