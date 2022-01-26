import { passport, Query } from 'api';
import { STANDARD_ERROR_TEXT } from 'constants/ui';
import { call } from 'redux-saga/effects';

export function* globalLogin(token: string) {
  const { data, isError }: Query<passport.globalLogin.Response> = yield call(passport.globalLogin.post, {
    token,
    device: '',
    country: '',
  });

  if (isError) {
    throw new Error(STANDARD_ERROR_TEXT);
  }
  if (!data) {
    return;
  }
  if ('error' in data) {
    throw new Error(STANDARD_ERROR_TEXT);
  }
}
