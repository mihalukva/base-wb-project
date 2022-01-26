export type DialogState = {
  isOpen: boolean;
  action: Function | null;
};

export type DialogStateList = Record<string, DialogState>;

export type CallBack = (state: ProviderState) => void;

export type ProviderState = {
  open: (id: string, action?: Function) => void;
  close: (id: string) => void;
  confirm: (id: string, ...confirmFnParams: any) => void;
  getVisibility: (id: string) => boolean;
  subscribe: (cb: CallBack) => void;
  unsubscribe: (id: string) => void;
};
