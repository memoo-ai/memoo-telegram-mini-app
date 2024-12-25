import type { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const home = import.meta.env.VITE_ROUTE_HOME;
const landing = import.meta.env.VITE_ROUTE_LANDING;
const earn = import.meta.env.VITE_ROUTE_EARN;
const airdrop = import.meta.env.VITE_ROUTE_AIRDROP;
const imo = import.meta.env.VITE_ROUTE_IMO;
const me = import.meta.env.VITE_ROUTE_ME;

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
        index: true,
        path: home,
        Component: lazy(() => import('../pages/home')),
        handle: { showTabBar: true },
      },
      {
        path: earn,
        Component: lazy(() => import('../pages/join')),
        handle: { showTabBar: true },
      },
      {
        path: airdrop,
        Component: lazy(() => import('../pages/launchpad/launchpad-airdrop')),
        handle: { showTabBar: true },
      },
      {
        path: imo,
        Component: lazy(() => import('../pages/launchpad/launchpad-imo')),
        handle: { showTabBar: true },
      },
      {
        path: me,
        Component: lazy(() => import('../pages/mine')),
        handle: { showTabBar: true },
      },
    ],
  },
  {
    path: '*',
    Component: lazy(() => import('../pages/not-found')),
  },
];

export default routeConfig;
