import { Saga } from 'redux-saga';
import { useStore } from 'react-redux';
import { useEffect, useState } from 'react';
import { RichStore } from '../types';

export const useInjectSagas = (sagas: Record<string, Saga>): boolean => {
  const [isInjected, setInjected] = useState<boolean>(false);
  const store = useStore() as RichStore;
  useEffect(() => {
    store.injectSagas(sagas);
    setInjected(true);
  }, [sagas, store]);

  return isInjected;
};
