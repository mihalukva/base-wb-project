import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SnackbarKey, useSnackbar } from 'notistack';
import { notificationsSelector } from 'redux/snackbar/selectors';
import { NotificationIdType, snackbarActions } from 'redux/snackbar';
import { CloseButton } from './_components/close-button';

let displayed: Array<NotificationIdType> = [];

export const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(notificationsSelector);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed = (id: SnackbarKey) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id: SnackbarKey) => {
    displayed = [...displayed.filter(key => id !== key)];
  };

  useEffect(() => {
    notifications.forEach(({ key, message, options = {}, dismissed = false }: any) => {
      if (dismissed) {
        closeSnackbar(key);

        return;
      }

      // do nothing if snackbar is already displayed
      if (displayed.includes(key)) {
        return;
      }

      // display snackbar using notistack
      enqueueSnackbar(<span aria-roledescription={`snackbar-${options.variant}-label`}>{message}</span>, {
        key,
        ...options,
        onClose: (event, reason, myKey) => {
          if (options.onClose) {
            options.onClose(event, reason, myKey);
          }
        },
        onExited: (event, myKey) => {
          // remove this snackbar from redux store
          dispatch(snackbarActions.remove(myKey));
          removeDisplayed(myKey);
        },
        action: notificationKey => <CloseButton notificationKey={notificationKey} />,
      });

      // keep track of snackbars that we've displayed
      storeDisplayed(key);
    });
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);

  return null;
};
