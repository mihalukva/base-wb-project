import { createSelector } from '@reduxjs/toolkit';
import { State } from 'router5';
import { Params } from 'router5/dist/types/base';

export const routerSelector = (state: any) => state.router || {};

export const previousRouteSelector = createSelector([routerSelector], (router): State | null => router.previousRoute);
export const routeSelector = createSelector([routerSelector], (router): State => router.route);
export const routeParamsSelector = createSelector([routerSelector], (router): Params => router.route.params);
export const transitionRouteSelector = createSelector(
  [routerSelector],
  (router): State | null => router.transitionRoute,
);
export const transitionErrorSelector = createSelector([routerSelector], (router): any => router.transitionError || {});
export const selectedClusterNsSelector = createSelector([routeParamsSelector], ({ project, cluster }) => ({
  [cluster]: [project],
}));
