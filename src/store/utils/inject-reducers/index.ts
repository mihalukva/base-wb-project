import { combineReducers, Reducer } from 'redux';
import { RichStore } from '../../types';

export const injectReducers = (reducers: Record<string, Reducer>, store: RichStore) => {
  const { injectedReducers } = store;

  const justInjectingReducers: Record<string, Reducer> = {};

  Object.keys(reducers)
    .filter(reducerName => !injectedReducers[reducerName])
    .forEach(reducerName => {
      justInjectingReducers[reducerName] = reducers[reducerName];
    });

  if (Object.keys(justInjectingReducers).length === 0) {
    return;
  }

  store.replaceReducer(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    combineReducers({
      ...injectedReducers,
      ...justInjectingReducers,
    }),
  );

  // eslint-disable-next-line no-param-reassign
  store.injectedReducers = {
    ...injectedReducers,
    ...justInjectingReducers,
  };

  store.dispatch({
    type: '@REDUX/INJECT_ASYNC_REDUCERS',
    payload: {
      reducers: Object.keys(justInjectingReducers).join(', '),
    },
  });
};
