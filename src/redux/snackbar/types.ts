import { OptionsObject, SnackbarKey, SnackbarOrigin, VariantType } from 'notistack';
import { SNACKBAR_REDUCER_NAME } from 'redux/snackbar/constants';

export type NotificationIdType = SnackbarKey;

export type MessageType = string;

export type NotificationOptionsType = {
  variant?: VariantType;
  anchorOrigin?: SnackbarOrigin;
};

export type ShowActionPayloadType = MessageType;
export type ShowPreparedActionPayloadType = { message: MessageType; key: number };

export type BaseShowActionPayloadType = {
  message: MessageType;
  options?: NotificationOptionsType;
};
export type BaseShowPreparedActionPayloadType = BaseShowActionPayloadType & { key: number };

export type NotificationType = {
  key: NotificationIdType;
  message: MessageType;
  dismissed: boolean;
  options?: OptionsObject;
};

export type SnackbarStateType = {
  notifications: Array<NotificationType>;
};

export type SnackbarStatePartType = {
  [SNACKBAR_REDUCER_NAME]: SnackbarStateType;
};
