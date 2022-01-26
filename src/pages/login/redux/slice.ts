import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_REDUCER_NAME } from './constants';
import { initialState } from './init';
import { PhoneForm, LoginResponse, UserState, ConfirmationCodeForm, User } from './types';

const slice = createSlice({
  name: USER_REDUCER_NAME,
  initialState,
  reducers: {
    setLoginData: (state, { payload: loginResponse }: PayloadAction<LoginResponse>): UserState => ({
      ...state,
      loginResponse,
    }),
    setUserInfo: (state, { payload: user }: PayloadAction<User>): UserState => ({
      ...state,
      user,
    }),
    setLoggedIn: (state): void => {
      // eslint-disable-next-line no-param-reassign
      state.isLoggedIn = true;
    },
    setAppLoading: (state, { payload: isAppLoading }: PayloadAction<boolean>): void => {
      // eslint-disable-next-line no-param-reassign
      state.isAppLoading = isAppLoading;
    },
    logout: (): UserState => ({ ...initialState }),
    resetUser: (state): void => {
      // eslint-disable-next-line no-param-reassign
      state.user = initialState.user;
    },
    resetLoginData: (state): void => {
      // eslint-disable-next-line no-param-reassign
      state.loginResponse = initialState.loginResponse;
    },
    getConfirmationCodeActionSaga: (state, _action: PayloadAction<PhoneForm>) => state,
    sigInActionSaga: (state, _action: PayloadAction<ConfirmationCodeForm>) => state,
    signOutActionSaga: state => state,
    initUserActionSaga: state => state,
  },
});

export const userActions = slice.actions;
export default slice.reducer;
