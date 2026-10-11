import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { navTop, navProfile, type NavItem } from '../nav';
import { sessionHistory } from '../data/session';

function Item({ item, childrenFirst = false }: { item: NavItem; childrenFirst?: boolean }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const kids = item.children;
  const [open, setOpen] = useState(!!kids?.some((child) => child.to === pathname));
  const Icon = item.icon;
  const active = !kids && item.to === pathname;
  const cls = `flex items-center gap-3 w-full h-10 px-3 rounded-md text-button transition ${active ? 'bg-primary-bg text-primary' : 'text-grey-80 hover:bg-grey-35/50'}`;
  const inner = (<><Icon size={18} /><span className="flex-1 text-left">{item.label}</span></>);

  if (!kids) return <Link to={item.to!} className={cls}>{inner}</Link>;
  const childItems = open && <div className="mt-1 space-y-1 pl-4">{kids.map((child) => <Item key={child.label} item={child} />)}</div>;
  const trigger = (
    <button type="button" className={cls} onClick={() => { setOpen((value) => !value); if (item.to) navigate(item.to); }}>
      {inner}
      <ChevronDown size={16} className={`transition ${open ? 'rotate-180' : ''}`} />
    </button>
  );
  return childrenFirst ? <div>{childItems}{trigger}</div> : <div>{trigger}{childItems}</div>;
}

function SessionHistory() {
  const [open, setOpen] = useState(true);
  const first = sessionHistory[0];
  const firstPath = 'to' in first ? first.to : '/session/seed-deck';

  return (
    <div className="mt-4 border-t border-grey-35 pt-3">
      <button type="button" onClick={() => setOpen((value) => !value)} className="flex w-full items-center justify-between px-3 text-button text-grey-80">
        <span>Session History</span>
        <ChevronDown size={16} className={`transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="mt-2 space-y-1">
          <NavLink to={firstPath}>
  {({ isActive }) => (
    <div className={`flex min-w-0 items-center gap-2 rounded-md px-2 py-1.5 text-small ${isActive ? 'bg-primary-bg text-primary shadow-1' : 'text-grey-80 hover:bg-grey-35/50'}`}>
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full border border-primary ${isActive ? 'bg-primary' : 'bg-transparent'}`} />
      <span className="truncate">{first.title}</span>
    </div>
  )}
</NavLink>
          {sessionHistory.slice(1).map((item) => (
            <div key={item.id} className="flex min-w-0 items-center gap-2 px-2 py-1.5 text-small text-grey-65">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full border border-grey-50" />
              <span className="truncate">{item.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="flex h-screen bg-grey-10 w-[260px] shrink-0 flex-col overflow-y-auto p-4">
      <div className="text-title mb-6 px-3 text-primary">{'<RE/AY>'}</div>
      <nav className="space-y-1">
        {navTop.map((item) => <Item key={item.label} item={item} />)}
      </nav>
      <SessionHistory />
      <div className="mt-auto pt-4"><Item item={navProfile} childrenFirst /></div>
    </aside>
  );
}
