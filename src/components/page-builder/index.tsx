import React, { Suspense, ReactElement, isValidElement } from 'react';
import { useRoute } from 'react-router5';
import { Routes } from 'types/router';
import { routes } from 'router/routes';
import { usePageTitle } from 'hooks/use-page-title';

export const PageBuilder = () => {
  const {
    route: { name: routeName },
  } = useRoute();
  const routeSegments: Array<string> = routeName.split('.');

  const currentRoute: Routes = [];
  let routeList: Routes = routes;
  for (let i = 0; i < routeSegments.length; i += 1) {
    const segment = routeSegments[i];
    const foundRoute = routeList.find(item => item.name === segment);
    if (foundRoute) {
      currentRoute.push(foundRoute);
      if (foundRoute.children) {
        routeList = foundRoute.children;
      }
    } else {
      console.error(`Не получилось найти сегмент "${segment}"  в маршруте ${routeName}`);
      break;
    }
  }
  const lastNode = currentRoute[currentRoute.length - 1];
  if (lastNode?.title) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    usePageTitle(lastNode.title);
  }

  return currentRoute.reduceRight<ReactElement | null>((page, route) => {
    const Child = route.Component;
    let error;
    if (route.errorChecker) {
      error = route.errorChecker();
    }
    const parent = error || <Child content={page} />;
    if (isValidElement(parent)) {
      return <Suspense fallback={null}>{parent}</Suspense>;
    }
    console.error(parent);
    throw new Error(`Can't build page. Invalid react element`);
  }, null);
};
