import type { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const home = import.meta.env.VITE_ROUTE_HOME;
const landing = import.meta.env.VITE_ROUTE_LANDING;
const earn = import.meta.env.VITE_ROUTE_EARN;
const airdrop = import.meta.env.VITE_ROUTE_AIRDROP;
const imo = import.meta.env.VITE_ROUTE_IMO;
const me = import.meta.env.VITE_ROUTE_ME;
const credit = import.meta.env.VITE_ROUTE_RETURN;
const collection = import.meta.env.VITE_ROUTE_ME;
const alerts = import.meta.env.VITE_ROUTE_ME;
const settings = import.meta.env.VITE_ROUTE_ME;
const collaborations = import.meta.env.VITE_ROUTE_ME;

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
      {
        path: credit,
        Component: lazy(() => import('../pages/return')),
        handle: { showTabBar: false },
      },
      {
        path: collection,
        Component: lazy(() => import('../pages/collection')),
        handle: { showTabBar: false },
      },
      {
        path: alerts,
        Component: lazy(() => import('../pages/alerts')),
        handle: { showTabBar: false },
      },
      {
        path: settings,
        Component: lazy(() => import('../pages/settings')),
        handle: { showTabBar: false },
      },
      {
        path: collaborations,
        Component: lazy(() => import('../pages/collaborations')),
        handle: { showTabBar: false },
      },
    ],
  },
  {
    path: '*',
    Component: lazy(() => import('../pages/not-found')),
  },
];

export default routeConfig;
