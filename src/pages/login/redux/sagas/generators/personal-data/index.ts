import { passport, Query } from 'api';
import { STANDARD_ERROR_TEXT } from 'constants/ui';
import { batchActions } from 'redux-batched-actions';
import { put, call } from 'redux-saga/effects';
import { userActions } from '../../../slice';

export function* personalData() {
  const { data, isError, errorText, code }: Query<passport.personalData.Response> = yield call(
    passport.personalData.get,
  );

  if (isError) {
    throw new Error(STANDARD_ERROR_TEXT);
  }
  if (!data || 'error' in data) {
    throw new Error(`${code}: ${errorText}`);
  }
  yield put(
    batchActions([userActions.resetLoginData(), userActions.setLoggedIn(), userActions.setUserInfo(data.user)]),
  );
}
