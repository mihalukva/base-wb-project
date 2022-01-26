import React, { useMemo } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useRoute, useRouter } from 'react-router5';
import { useLinkOnClick } from 'hooks/use-on-modified-click';

type Props = {
  title: string;
  routeName: string;
  secondary?: boolean;
};

export const MenuItem = ({ title, routeName, secondary = false }: Props) => {
  const {
    route: { name },
  } = useRoute();
  const router = useRouter();

  const handleClick = useLinkOnClick(() => {
    router.navigate(routeName);
  }, [router]);

  const path = useMemo(() => router.buildPath(routeName), [routeName, router]);

  const isSelected = useMemo(() => routeName === name, [name, routeName]);

  return (
    <ListItemButton
      component="a"
      href={path}
      onClick={handleClick}
      selected={isSelected}
      sx={[
        {
          color: 'sideMenu.contrastText',
          '&.Mui-selected': {
            borderLeft: 5,
            borderColor: 'sideMenu.light',
          },
          '&:hover': {
            bgcolor: 'sideMenu.light',
          },
        },
        secondary && {
          color: 'sideMenu.light',
        },
        secondary &&
          !isSelected && {
            '&:hover': {
              color: 'sideMenu.dark',
            },
          },
      ]}
    >
      <ListItemText color="inherit" primary={title} />
    </ListItemButton>
  );
};
