import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLoadingProvider, LoadersDict } from 'components/loading-provider';
import { useActions } from 'hooks/use-actions';
import { userActions } from 'pages/login/redux';

export const SignOutButton = () => {
  const isLoading = useLoadingProvider(LoadersDict.SIGN_OUT);
  const { logout } = useActions({ logout: userActions.signOutActionSaga });

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Button
      disableElevation
      endIcon={<LogoutIcon />}
      onClick={logout}
      startIcon={isLoading && <CircularProgress color="inherit" size={20} />}
      variant="outlined"
    >
      Выйти
    </Button>
  );
};
