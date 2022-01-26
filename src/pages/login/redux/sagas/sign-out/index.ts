import { passport, Query } from 'api';
import { LoadersDict, loadingProviderActions } from 'components/loading-provider';
import { put, call, takeLatest } from 'redux-saga/effects';
import { snackbarActions } from 'redux/snackbar';
import { userActions } from '../../slice';

function* worker() {
  try {
    yield put(loadingProviderActions.enable(LoadersDict.SIGN_OUT));

    const { data }: Query<passport.logout.Response> = yield call(passport.logout.post);

    if (!data) {
      return;
    }
    if ('error' in data) {
      throw new Error(data.error);
    }
    yield put(userActions.logout());
  } catch (e) {
    yield put(snackbarActions.error('Не удалось завершить сессию, проверьте подключение'));
    console.error(e.message);
  } finally {
    yield put(loadingProviderActions.disable(LoadersDict.SIGN_OUT));
  }
}

export function* watcher() {
  yield takeLatest(userActions.signOutActionSaga, worker);
}
