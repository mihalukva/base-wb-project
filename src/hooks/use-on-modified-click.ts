import { DependencyList, useCallback } from 'react';
import { isModifierPressed } from 'utils/is-modifier-pressed';

export function useLinkOnClick(action: Function, deps?: DependencyList) {
  return useCallback(
    (event, ...args) => {
      if (isModifierPressed(event)) {
        return;
      }
      event.preventDefault();
      action(event, ...args);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps ? [...deps] : [],
  );
}
