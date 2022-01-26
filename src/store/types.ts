import { Reducer, Store } from 'redux';
import { DefaultRootState } from 'react-redux';
import { Saga, SagaMiddleware, Task } from 'redux-saga';

export interface RichStore extends Store<DefaultRootState> {
  injectedReducers: Record<string, Reducer>;
  injectedSagas: Record<string, Task>;
  sagaMiddleware: SagaMiddleware;
  injectSagas: (sagas: Record<string, Saga>) => void;
  injectReducers: (reducers: Record<string, Reducer>) => void;
}
