import React, { PropsWithChildren } from 'react';
import { SignOutButton, ThemeModeToggle } from 'components';
import { Box } from '@mui/material';
import { SideMenu } from '../side-menu';
import { Logo } from '../logo';
import styles from './index.module.scss';

export const PageLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div className={styles.root}>
      <Logo />
      <Box
        className={styles.header}
        sx={{
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <ThemeModeToggle />
        <div className={styles.signOutButton}>
          <SignOutButton />
        </div>
      </Box>
      <SideMenu />
      <Box
        sx={{
          bgcolor: 'background.default',
          p: 4,
          overflow: 'auto',
        }}
      >
        {children}
      </Box>
    </div>
  );
};
