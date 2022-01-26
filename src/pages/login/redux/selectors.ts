import { createSelector } from '@reduxjs/toolkit';
import { UserState, UserStatePart, LoginResponse } from './types';
import { USER_REDUCER_NAME } from './constants';
import { initialState } from './init';

export const userStateSelector = (store: UserStatePart): UserState => store[USER_REDUCER_NAME] || initialState;

export const loginResponseSelector = createSelector(
  userStateSelector,
  (state: UserState): LoginResponse => state.loginResponse,
);

export const userPhoneSelector = createSelector(loginResponseSelector, (state: LoginResponse): string => state.phone);

export const hasTokenSelector = createSelector(
  loginResponseSelector,
  (state: LoginResponse): boolean => state.token.length > 0,
);

export const isLoggedInSelector = createSelector(userStateSelector, (state: UserState): boolean => state.isLoggedIn);

export const isAppLoadingSelector = createSelector(
  userStateSelector,
  (state: UserState): boolean => state.isAppLoading,
);

export const timeoutSelector = createSelector(
  loginResponseSelector,
  (state: LoginResponse): number => state.till_next_request / 1000,
);

export const codeLengthSelector = createSelector(
  loginResponseSelector,
  (state: LoginResponse): number => state.code_length,
);
