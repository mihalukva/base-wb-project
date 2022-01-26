import { useDispatch } from 'react-redux';
import { ActionCreatorsMapObject, bindActionCreators } from 'redux';
import { DependencyList, useMemo } from 'react';

export function useActions<T extends ActionCreatorsMapObject>(actions: T, deps?: DependencyList) {
  const dispatch = useDispatch();

  return useMemo<T>(
    () => bindActionCreators(actions, dispatch),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps ? [dispatch, ...deps] : [dispatch],
  );
}
