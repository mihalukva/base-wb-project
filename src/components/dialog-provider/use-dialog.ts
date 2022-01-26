import { useCallback, useContext, useMemo } from 'react';
import { DialogContext } from './context';

export const useDialog = (id: string) => {
  const ctx = useContext(DialogContext);
  const isOpen = useMemo(() => ctx.getVisibility(id), [ctx, id]);
  const openDialog = useCallback((action?: Function) => ctx.open(id, action), [ctx, id]);
  const confirmDialog = useCallback((...confirmFnParams: any) => ctx.confirm(id, ...confirmFnParams), [ctx, id]);
  const closeDialog = useCallback(() => ctx.close(id), [ctx, id]);

  return {
    isOpen,
    openDialog,
    confirmDialog,
    closeDialog,
  };
};
