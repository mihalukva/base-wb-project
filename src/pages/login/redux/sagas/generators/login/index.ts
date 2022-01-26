import { passport, Query } from 'api';
import { STANDARD_ERROR_TEXT } from 'constants/ui';
import { call } from 'redux-saga/effects';

export function* login(props: passport.login.Request) {
  const { data, isError }: Query<passport.login.Response> = yield call(passport.login.post, props);

  if (isError) {
    throw new Error(STANDARD_ERROR_TEXT);
  }
  if (!data) {
    return;
  }
  if ('error' in data) {
    if (data.error === 'invalid_token') {
      throw new Error('Неверный токен');
    } else if (data.error === 'incorrect_code') {
      throw new Error('Неверный код');
    } else {
      throw new Error(data.error);
    }
  }
}
