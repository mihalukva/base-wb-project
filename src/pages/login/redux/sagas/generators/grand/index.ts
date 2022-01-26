import { passport, Query } from 'api';
import { STANDARD_ERROR_TEXT } from 'constants/ui';
import { call } from 'redux-saga/effects';

export function* grant() {
  const { data, isError }: Query<passport.grant.Response> = yield call(passport.grant.post);

  if (isError) {
    throw new Error(STANDARD_ERROR_TEXT);
  }
  if (!data) {
    return;
  }
  if ('error' in data) {
    throw new Error(STANDARD_ERROR_TEXT);
  }
  if (!('token' in data)) {
    throw new Error(STANDARD_ERROR_TEXT);
  }

  return data.token;
}
