import { useInjectReducers, useInjectSagas } from 'store/hooks';

export const InjectedComponent = ({ reducers, sagas, children }: any) => {
  const isReducerInjected = useInjectReducers(reducers);
  const isSagaInjected = useInjectSagas(sagas);

  return isReducerInjected && isSagaInjected ? children : null;
};
