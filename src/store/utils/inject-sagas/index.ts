import { Saga } from 'redux-saga';
import { RichStore } from '../../types';

export const injectSagas = (sagas: Record<string, Saga>, store: RichStore): void => {
  const { injectedSagas } = store;

  const injectedKeys: string[] = [];

  Object.keys(sagas).forEach(name => {
    if (!injectedSagas[name]) {
      injectedSagas[name] = store.sagaMiddleware.run(sagas[name]);
      injectedKeys.push(name);
    }
  });

  if (injectedKeys.length > 0) {
    // log to the devtools
    store.dispatch({
      type: '@REDUX/INJECT_ASYNC_SAGA',
      payload: {
        name: injectedKeys.join(', '),
      },
    });
  }
};
