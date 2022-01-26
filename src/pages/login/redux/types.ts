import { passport } from 'api';
import { USER_REDUCER_NAME } from './constants';

export type PhoneForm = {
  phone: string;
};
export type ConfirmationCodeForm = {
  code: string;
};

export type LoginResponse = { phone: string } & passport.confirmationCode.PositiveResponse;
export type User = passport.personalData.User;

export type UserState = {
  loginResponse: LoginResponse;
  user: User;
  isLoggedIn: boolean;
  isAppLoading: boolean;
};

export type UserStatePart = {
  [USER_REDUCER_NAME]: UserState;
};
