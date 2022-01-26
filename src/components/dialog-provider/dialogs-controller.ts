import { forEach } from 'lodash';
import { CallBack, DialogStateList, ProviderState } from './types';

export class DialogsController {
  private list: DialogStateList = {};

  private callbackList: Record<string, CallBack> = {};

  public subscribe = (cb: CallBack) => {
    const id = Date.now().toString();
    this.callbackList[id] = cb;

    return id;
  };

  public unsubscribe = (id: string) => {
    delete this.callbackList[id];
  };

  private notifyListeners = () => {
    forEach(this.callbackList, callback => callback(this.getState()));
  };

  public open = (id: string, action?: Function) => {
    this.list[id] = {
      isOpen: true,
      action: action || null,
    };
    this.notifyListeners();
  };

  public close = (id: string) => {
    this.list[id] = {
      isOpen: false,
      action: null,
    };
    this.notifyListeners();
  };

  public confirm = (id: string, ...confirmFnParams: any) => {
    const { action } = this.list[id];
    if (action) {
      action(...confirmFnParams);
    }
    this.list[id] = {
      isOpen: false,
      action: null,
    };
    this.notifyListeners();
  };

  public getVisibility = (id: string) => {
    if (this.list[id]) {
      return this.list[id].isOpen;
    }

    return false;
  };

  public getState = (): ProviderState => {
    return {
      open: this.open,
      close: this.close,
      confirm: this.confirm,
      getVisibility: this.getVisibility,
      subscribe: this.subscribe,
      unsubscribe: this.unsubscribe,
    };
  };
}
