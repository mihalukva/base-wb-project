import { getConfirmationCodeSaga, signInSaga, signOutSaga, initUserSaga } from 'pages/login/redux';

export const rootSagas = {
  getConfirmationCodeSaga: getConfirmationCodeSaga.watcher,
  signInSaga: signInSaga.watcher,
  signOutSaga: signOutSaga.watcher,
  initUserSaga: initUserSaga.watcher,
};
