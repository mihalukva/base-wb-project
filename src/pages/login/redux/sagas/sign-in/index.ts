import { PayloadAction } from '@reduxjs/toolkit';
import { LoadersDict, loadingProviderActions } from 'components/loading-provider';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { snackbarActions } from 'redux/snackbar';
import { userActions } from '../../slice';
import { ConfirmationCodeForm } from '../../types';
import { grant } from '../generators/grand';
import { globalLogin } from '../generators/global';
import { personalData } from '../generators/personal-data';
import { login } from '../generators/login';
import { loginResponseSelector } from '../../selectors';

function* worker({ payload: { code: notifyCode } }: PayloadAction<ConfirmationCodeForm>) {
  try {
    yield put(loadingProviderActions.enable(LoadersDict.SIGN_IN));
    const { token } = yield select(loginResponseSelector);
    yield call(login, {
      token,
      notifyCode,
    });
    const token2: string = yield call(grant);
    yield call(globalLogin, token2);
    yield call(personalData);
  } catch (error) {
    yield put(snackbarActions.error(error.message));
    console.error(error.message);
  } finally {
    yield put(loadingProviderActions.disable(LoadersDict.SIGN_IN));
  }
}

export function* watcher() {
  yield takeLatest(userActions.sigInActionSaga, worker);
}
