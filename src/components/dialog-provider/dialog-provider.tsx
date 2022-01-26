import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { DialogContext } from './context';
import { DialogsController } from './dialogs-controller';
import { ProviderState } from './types';

export const DialogProvider = ({ children }: PropsWithChildren<{}>) => {
  const { current: dialog } = useRef(new DialogsController());
  const [providerState, setProviderState] = useState<ProviderState>(dialog.getState());

  useEffect(() => {
    const id = dialog.subscribe(state => {
      setProviderState(_ => ({ ...state }));
    });

    return () => {
      dialog.unsubscribe(id);
    };
  }, [dialog]);

  return <DialogContext.Provider value={providerState}>{children}</DialogContext.Provider>;
};
