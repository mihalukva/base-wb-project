import React from 'react';
import root from 'pages/root/route';
import { List } from '@mui/material';
import { MenuItem } from './components/menu-item';

export const SideMenu = () => {
  return (
    <List
      component="nav"
      disablePadding
      sx={{
        backgroundColor: 'sideMenu.main',
        borderRight: 1,
        borderColor: 'divider',
      }}
    >
      <MenuItem routeName={root.name} title={root.title || ''} />
    </List>
  );
};
