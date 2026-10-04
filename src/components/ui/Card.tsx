import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export default function Card({ to, children, className = '' }: { to?: string; children: ReactNode; className?: string }) {
  const cls = `block bg-white rounded-lg shadow-1 glass p-4 ${to ? 'transition hover:shadow-color' : ''} ${className}`;
  return to ? <Link to={to} className={cls}>{children}</Link> : <div className={cls}>{children}</div>;
}
