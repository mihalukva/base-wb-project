import { UserState } from './types';

export const initialState: UserState = {
  loginResponse: {
    phone: '',
    till_next_request: 0,
    token: '',
    code_length: 0,
  },
  user: {
    id: 0,
    first_name: '',
    last_name: '',
    middle_name: '',
    email: '',
    phone: 0,
    birthday: '',
    gender: '',
    avatar: '',
  },
  isLoggedIn: false,
  isAppLoading: true,
};
