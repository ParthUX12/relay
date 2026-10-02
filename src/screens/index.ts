import type { ComponentType } from 'react';
import NewSession from './NewSession';
import Projects from './Projects';
import NewProject from './NewProject';
import Configure from './Configure';
import ConnectionsHub from './ConnectionsHub';
import UpgradePlan from './UpgradePlan';
import Settings from './Settings';
import Language from './Language';
import Help from './Help';
import Logout from './Logout';

// ONE ENTRY PER FIGMA SCREEN. Sidebar links live in src/nav.ts.
export const screens: { path: string; component: ComponentType }[] = [
  { path: '/', component: NewSession },
  { path: '/projects', component: Projects },
  { path: '/projects/new', component: NewProject },
  { path: '/projects/configure', component: Configure },
  { path: '/connections', component: ConnectionsHub },
  { path: '/profile/upgrade', component: UpgradePlan },
  { path: '/profile/settings', component: Settings },
  { path: '/profile/language', component: Language },
  { path: '/profile/help', component: Help },
  { path: '/logout', component: Logout },
];
