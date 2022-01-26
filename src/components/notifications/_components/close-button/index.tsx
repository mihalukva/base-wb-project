import React, { memo, useCallback } from 'react';
import { CloseOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { NotificationIdType, snackbarActions } from 'redux/snackbar';
import { useActions } from 'hooks/use-actions';
import styles from './index.module.scss';

type PropsType = {
  notificationKey: NotificationIdType;
};

export const CloseButton = memo(({ notificationKey }: PropsType) => {
  const { close } = useActions({ close: snackbarActions.close });
  const handleClick = useCallback(() => {
    close(notificationKey);
  }, [close, notificationKey]);

  return (
    <IconButton className={styles.root} onClick={handleClick}>
      <CloseOutlined className={styles.icon} />
    </IconButton>
  );
});
