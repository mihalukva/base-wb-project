import { passport, Query } from 'api';
import { STANDARD_ERROR_TEXT } from 'constants/ui';
import { call } from 'redux-saga/effects';

export function* globalGrant() {
  const { data, isError, errorText }: Query<passport.globalGrant.Response> = yield call(passport.globalGrant.post);

  if (data) {
    if ('error' in data) {
      throw new Error(data.error);
    }
    if (!('token' in data)) {
      throw new Error(STANDARD_ERROR_TEXT);
    }

    return data.token;
  }

  if (isError) {
    throw new Error(errorText);
  }

  return '';
}
