import { Plus, FolderKanban, FolderPlus, SlidersHorizontal, Plug, User, Sparkles, Settings, Languages, HelpCircle, LogOut, type LucideIcon } from 'lucide-react';
import { user } from './data/mock';

export type NavItem = { label: string; to?: string; icon: LucideIcon; children?: NavItem[] };

// Sidebar structure. Projects and Profile expand to show children.
export const navTop: NavItem[] = [
  { label: 'New session', to: '/', icon: Plus },
  {
    label: 'Projects', to: '/projects', icon: FolderKanban,
    children: [
      { label: 'New project', to: '/projects/new', icon: FolderPlus },
      { label: 'Configure', to: '/projects/configure', icon: SlidersHorizontal },
    ],
  },
  { label: 'Connections hub', to: '/connections', icon: Plug },
];

export const navProfile: NavItem = {
  label: user.name, icon: User,
  children: [
    { label: 'Upgrade plan', to: '/profile/upgrade', icon: Sparkles },
    { label: 'Settings', to: '/profile/settings', icon: Settings },
    { label: 'Language', to: '/profile/language', icon: Languages },
    { label: 'Help', to: '/profile/help', icon: HelpCircle },
    { label: 'Logout', to: '/logout', icon: LogOut },
  ],
};
