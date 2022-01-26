import React, { useEffect } from 'react';
import { PageProgress } from 'components';
import { LoginPage } from 'pages/login';
import { useSelector } from 'react-redux';
import { isLoggedInSelector, userActions, isAppLoadingSelector } from 'pages/login/redux';
import { useActions } from 'hooks/use-actions';
import { Notifications } from '../notifications';
import { PageBuilder } from '../page-builder';
import { ErrorBoundary } from '../error-boundary';
import { PageLayout } from '../page-layout';

export const ConnectedPage = () => {
  const isLoggedIn = useSelector(isLoggedInSelector);
  const isAppLoading = useSelector(isAppLoadingSelector);
  const { initUser } = useActions({ initUser: userActions.initUserActionSaga });
  useEffect(() => {
    initUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isAppLoading) {
    return <PageProgress />;
  }

  return (
    <>
      {isLoggedIn ? (
        <>
          <PageLayout>
            <ErrorBoundary>
              <PageBuilder />
            </ErrorBoundary>
          </PageLayout>
        </>
      ) : (
        <LoginPage />
      )}
      <Notifications />
    </>
  );
};
