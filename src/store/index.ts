import { batchDispatchMiddleware } from 'redux-batched-actions';
import { rootReducers } from './root-reducers';
import { rootSagas } from './root-sagas';
import { middleware as router5Middleware } from '../router';
import { createStore } from './create-store';

export const store = createStore({
  reducers: rootReducers,
  sagas: rootSagas,
  extraMiddlewares: [router5Middleware, batchDispatchMiddleware],
});
