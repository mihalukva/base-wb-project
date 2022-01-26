import React, { useMemo } from 'react';
import { Link } from '@mui/material';
import { useLinkOnClick } from 'hooks/use-on-modified-click';
import { useRouter } from 'react-router5';

export const Logo = () => {
  const router = useRouter();

  const handleClick = useLinkOnClick(() => {
    router.navigateToDefault();
  }, [router]);

  const defaultPath = useMemo(() => {
    const { defaultRoute } = router.getOptions();
    if (defaultRoute) {
      return router.buildPath(defaultRoute);
    }
  }, [router]);

  return (
    <Link
      href={defaultPath}
      onClick={handleClick}
      sx={{
        color: 'sideMenu.contrastText',
        bgcolor: 'sideMenu.main',
        borderBottom: 1,
        borderRight: 1,
        borderColor: 'divider',
        p: 2,
      }}
      tabIndex={0}
      underline="none"
      variant="h5"
    >
      WB Balancer
    </Link>
  );
};
