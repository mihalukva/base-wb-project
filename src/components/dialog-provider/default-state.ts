import { ProviderState, DialogState } from './types';

export const defaultState: ProviderState = {
  open: () => {},
  close: () => {},
  confirm: () => {},
  getVisibility: () => false,
  subscribe: () => {},
  unsubscribe: () => {},
};

export const defaultDialogState: DialogState = {
  isOpen: false,
  action: null,
};
