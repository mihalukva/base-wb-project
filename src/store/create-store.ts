import { applyMiddleware, combineReducers, createStore as originalCreateStore, Middleware, Reducer } from 'redux';
import createSagaMiddleware, { Saga } from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { RichStore } from './types';
import { injectReducers, injectSagas } from './utils';

type Config = {
  reducers?: Record<string, Reducer>;
  sagas?: Record<string, Saga>;
  extraMiddlewares?: Middleware[];
};

export function createStore({ extraMiddlewares = [], reducers = {}, sagas = {} }: Config): RichStore {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, ...extraMiddlewares];
  const enhancers = composeWithDevTools(applyMiddleware(...middlewares));
  const rootReducers = combineReducers(reducers);
  const store = originalCreateStore(rootReducers, enhancers) as RichStore;
  store.injectedReducers = reducers;
  store.injectedSagas = {};
  store.sagaMiddleware = sagaMiddleware;
  store.injectReducers = (injectingReducers: Record<string, Reducer>) => {
    injectReducers(injectingReducers, store);
  };
  store.injectSagas = (injectingSagas: Record<string, Saga>) => {
    injectSagas(injectingSagas, store);
  };

  store.injectSagas(sagas);

  return store;
}
