import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

// Sidebar + content area with a fade transition on route change. Logout hides the sidebar.
export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <div className="flex h-screen bg-grey-10 text-grey-90">
      {pathname !== '/logout' && <Sidebar />}
      <div key={pathname} className="screen-in flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
