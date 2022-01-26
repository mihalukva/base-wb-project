import React, { memo } from 'react';
import { CircularProgress } from '@mui/material';
import cn from './index.module.scss';

type PropsType = {
  id?: string;
};

export const CircularPreloader = memo(({ id }: PropsType) => {
  return (
    <div className={cn.root} id={id}>
      <CircularProgress />
    </div>
  );
});
