import { useCallback, useState } from 'react';

export const useConfirmDialog = (confirmHandler: Function) => {
  const [isOpen, setOpen] = useState(false);
  const [confirmHandlerProps, setConfirmHandlerProps] = useState();

  const confirm = useCallback(() => {
    setOpen(false);
    confirmHandler(confirmHandlerProps);
  }, [confirmHandler, confirmHandlerProps]);

  const open = useCallback(props => {
    setConfirmHandlerProps(props);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  return {
    isOpen,
    confirm,
    open,
    close,
  };
};
