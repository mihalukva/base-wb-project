import loggerPlugin from 'router5-plugin-logger';
import browserPlugin from 'router5-plugin-browser';
import { createRouter } from 'router5';
import { router5Middleware } from 'redux-router5';
import { ROOT_PAGE_NODE } from 'pages/root/node';
import { routes } from './routes';
import { throwProjectAndClusterPlugin } from './throw-project-and-cluster-plugin';

export const router = createRouter(routes, {
  defaultRoute: ROOT_PAGE_NODE,
  queryParamsMode: 'loose',
});
router.usePlugin(browserPlugin());
router.usePlugin(loggerPlugin);
router.usePlugin(throwProjectAndClusterPlugin);
export const middleware = router5Middleware(router);
