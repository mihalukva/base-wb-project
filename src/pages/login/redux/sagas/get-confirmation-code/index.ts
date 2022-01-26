import { PayloadAction } from '@reduxjs/toolkit';
import { passport, Query } from 'api';
import { LoadersDict, loadingProviderActions } from 'components/loading-provider';
import { STANDARD_ERROR_TEXT } from 'constants/ui';
import { put, call, takeLatest } from 'redux-saga/effects';
import { snackbarActions } from 'redux/snackbar';
import { userActions } from '../../slice';
import { PhoneForm } from '../../types';

function* worker({ payload: { phone } }: PayloadAction<PhoneForm>) {
  try {
    yield put(loadingProviderActions.enable(LoadersDict.GET_CONFIRMATION_CODE));
    const { data, isError }: Query<passport.confirmationCode.Response> = yield call(passport.confirmationCode.get, {
      phone,
      is_terms_and_conditions_accepted: true,
    });

    if (isError) {
      throw new Error(STANDARD_ERROR_TEXT);
    }
    if (!data) {
      return;
    }
    if ('error' in data) {
      throw new Error(data.error);
    }

    yield put(
      userActions.setLoginData({
        phone,
        ...data,
      }),
    );
  } catch (error) {
    yield put(snackbarActions.error(error.message));
  } finally {
    yield put(loadingProviderActions.disable(LoadersDict.GET_CONFIRMATION_CODE));
  }
}

export function* watcher() {
  yield takeLatest(userActions.getConfirmationCodeActionSaga, worker);
}
