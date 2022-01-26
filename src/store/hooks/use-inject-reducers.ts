import { Reducer } from 'redux';
import { useStore } from 'react-redux';
import { useEffect, useState } from 'react';
import { RichStore } from '../types';

const useInjectReducers = (reducers: Record<string, Reducer>): boolean => {
  const [isInjected, setInjected] = useState<boolean>(false);
  const store = useStore() as RichStore;
  useEffect(() => {
    store.injectReducers(reducers);
    setInjected(true);
  }, [reducers, store]);

  return isInjected;
};

export { useInjectReducers };
