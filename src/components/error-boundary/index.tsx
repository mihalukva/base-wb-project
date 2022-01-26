import React, { Component, ReactNode, ReactNodeArray } from 'react';
import { Box } from '@mui/material';
import { withRouter } from 'react-router5';
import { Router, Subscription } from 'router5';
import { Unsubscribe } from 'router5/dist/types/base';

type PropsType = {
  children: ReactNode | ReactNodeArray | null;
  router: Router;
};

type StateType = {
  error: boolean;
};
class ErrorBoundaryWrapper extends Component<PropsType, StateType> {
  private routerSubscription: Subscription | Unsubscribe | undefined;

  constructor(props: PropsType) {
    super(props);

    this.state = {
      error: false,
    };
  }

  componentDidMount() {
    this.routerSubscription = this.props.router.subscribe(({ route, previousRoute }) => {
      if (route.name !== previousRoute.name) {
        this.setState({
          error: false,
        });
      }
    });
  }

  shouldComponentUpdate(_nextProps: any, nextState: any) {
    return this.state.error !== nextState.error;
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error(errorInfo);

    this.setState({
      error: true,
    });
  }

  componentWillUnmount() {
    if (this.routerSubscription) {
      if (typeof this.routerSubscription === 'function') {
        this.routerSubscription();
      } else {
        this.routerSubscription.unsubscribe();
      }
    }
  }

  render() {
    if (this.state.error) {
      return (
        <Box alignItems="center" display="flex" flexDirection="column" height="50%" justifyContent="center">
          <h1>Что-то пошло не так</h1>
        </Box>
      );
    }

    return this.props.children;
  }
}

const ErrorBoundary = withRouter<{ children: ReactNode }>(ErrorBoundaryWrapper);
export { ErrorBoundary };
