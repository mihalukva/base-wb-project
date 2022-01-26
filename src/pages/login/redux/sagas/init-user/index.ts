import { call, put, takeLatest } from 'redux-saga/effects';
import { snackbarActions } from 'redux/snackbar';
import { userActions } from '../../slice';
import { globalGrant } from '../generators/global-grant';
import { personalData } from '../generators/personal-data';
import { login } from '../generators/login';

function* worker() {
  try {
    const token: string = yield call(globalGrant);
    yield call(login, { token });
    yield call(personalData);
  } catch (error) {
    yield put(snackbarActions.error(error.message));
    console.error(error.message);
  } finally {
    yield put(userActions.setAppLoading(false));
  }
}

export function* watcher() {
  yield takeLatest(userActions.initUserActionSaga, worker);
}
