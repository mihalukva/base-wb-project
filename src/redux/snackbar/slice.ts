import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OptionsObject } from 'notistack';
import { NOTIFICATIONS_ERROR_LEVEL } from 'constants/ui';
import { NotificationsErrorLevel } from 'types/global';
import { SNACKBAR_REDUCER_NAME } from './constants';
import {
  MessageType,
  NotificationIdType,
  NotificationType,
  ShowActionPayloadType,
  ShowPreparedActionPayloadType,
  BaseShowActionPayloadType,
  BaseShowPreparedActionPayloadType,
  SnackbarStateType,
  NotificationOptionsType,
} from './types';

export const initialState: SnackbarStateType = {
  notifications: [],
};

const defaultOptions: OptionsObject = {
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'right',
  },
};

const genMsgKey = () => new Date().getTime() + Math.random();
const addKeyToPayload = (message: ShowActionPayloadType) => {
  return {
    payload: {
      message,
      key: genMsgKey(),
    },
  };
};

const createNotification = (message: MessageType, key: number, options?: NotificationOptionsType): NotificationType => {
  return {
    key,
    message,
    dismissed: false,
    options: {
      ...defaultOptions,
      ...options,
    },
  };
};

const slice = createSlice({
  name: SNACKBAR_REDUCER_NAME,
  initialState,
  reducers: {
    show: {
      reducer: (
        state: SnackbarStateType,
        { payload: { message, options = {}, key } }: PayloadAction<BaseShowPreparedActionPayloadType>,
      ) => {
        const notification = createNotification(message, key, {
          ...defaultOptions,
          ...options,
        });

        return {
          notifications: [...state.notifications, notification],
        };
      },
      prepare: (payload: BaseShowActionPayloadType) => {
        return {
          payload: {
            ...payload,
            key: genMsgKey(),
          },
        };
      },
    },
    success: {
      reducer: (
        state: SnackbarStateType,
        { payload: { message, key } }: PayloadAction<ShowPreparedActionPayloadType>,
      ) => {
        const notification = createNotification(message, key, {
          ...defaultOptions,
          variant: 'success',
        });

        return {
          notifications: [...state.notifications, notification],
        };
      },
      prepare: addKeyToPayload,
    },
    error: {
      reducer: (
        state: SnackbarStateType,
        { payload: { message, key } }: PayloadAction<ShowPreparedActionPayloadType>,
      ) => {
        const notification = createNotification(message, key, {
          ...defaultOptions,
          variant: 'error',
        });

        return {
          notifications: [...state.notifications, notification],
        };
      },
      prepare: addKeyToPayload,
    },
    hardError: {
      reducer: (
        state: SnackbarStateType,
        { payload: { message, key } }: PayloadAction<ShowPreparedActionPayloadType>,
      ) => {
        const notification = createNotification(message, key, {
          ...defaultOptions,
          variant: 'error',
        });

        // Создал отдельный экшен и вызываю его на тех ошибках, которые пока решил не показывать
        // @ts-ignore
        if (NOTIFICATIONS_ERROR_LEVEL === NotificationsErrorLevel.HARD) {
          return {
            notifications: [...state.notifications, notification],
          };
        }

        return state;
      },
      prepare: addKeyToPayload,
    },
    close(state: SnackbarStateType, { payload: key }: PayloadAction<NotificationIdType>) {
      return {
        ...state,
        notifications: state.notifications.map(notification => ({
          ...notification,
          ...(notification.key === key && {
            dismissed: true,
          }),
        })),
      };
    },
    closeAll(state: SnackbarStateType) {
      return {
        ...state,
        notifications: state.notifications.map(notification => ({
          ...notification,
          dismissed: true,
        })),
      };
    },
    remove(state: SnackbarStateType, { payload: key }: PayloadAction<NotificationIdType>) {
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.key !== key),
      };
    },
  },
});

export const snackbarActions = slice.actions;
export default slice.reducer;
