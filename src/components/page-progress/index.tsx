import React from 'react';
import { CircularProgress } from '@mui/material';
import styles from './index.module.scss';

export const PageProgress = () => {
  return (
    <div className={styles.root}>
      <CircularProgress size={100} />
    </div>
  );
};
