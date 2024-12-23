import type { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const home = import.meta.env.VITE_ROUTE_HOME;
const landing = import.meta.env.VITE_ROUTE_LANDING;

const routeConfig: RouteObject[] = [
  {
    path: '/',
    Component: lazy(() => import('../layouts/BasicLayout')),
    children: [
      {
        path: landing,
        Component: lazy(() => import('../pages/landing')),
      },
      {
        path: home,
        Component: lazy(() => import('../pages/home')),
      },
    ],
  },
  {
    path: '*',
    Component: lazy(() => import('../pages/not-found')),
  },
];

export default routeConfig;
