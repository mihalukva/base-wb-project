import { ComponentType, ReactElement } from 'react';
import { PageProps } from './page';

export type RouteParams = {
  cluster?: string;
  name?: string;
  vmName?: string;
  id?: string;
};

export type Route = {
  name: string;
  path: string;
  title?: string;
  Component: ComponentType<PageProps>;
  children?: Array<Route>;
  errorChecker?: () => ReactElement | null;
};

export type Routes = Array<Route>;
