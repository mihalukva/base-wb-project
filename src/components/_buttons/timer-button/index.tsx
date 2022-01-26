import React, { PropsWithChildren, useEffect, useState } from 'react';
import { Button, ButtonProps, CircularProgress } from '@mui/material';

type Props = { timeout: number } & ButtonProps;

export const TimerButton = ({ children, timeout, disabled, ...rest }: PropsWithChildren<Props>) => {
  const [remainTime, setRemainTime] = useState(timeout);
  useEffect(() => {
    if (remainTime > 0) {
      const timeoutId = setTimeout(() => {
        setRemainTime(value => value - 1);
      }, 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [remainTime]);

  return (
    <Button
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      disabled={remainTime > 0 || disabled}
      startIcon={remainTime > 0 && <CircularProgress color="inherit" size={20} />}
      variant="outlined"
    >
      {remainTime === 0 ? children : `${remainTime} Сек.`}
    </Button>
  );
};
