import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { navTop, navProfile, type NavItem } from '../nav';

function Item({ item, nested }: { item: NavItem; nested?: boolean }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const kids = item.children;
  const [open, setOpen] = useState(!!kids?.some((c) => c.to === pathname));
  const Icon = item.icon;
  const active = !kids && item.to === pathname;
  const cls = `flex items-center gap-3 w-full h-10 px-3 rounded-md text-button transition ${
    active ? 'bg-primary-bg text-primary' : 'text-grey-80 hover:bg-grey-35/50'
  }`;
  const inner = (<><Icon size={18} /><span className="flex-1 text-left">{item.label}</span></>);

  if (!kids) return <Link to={item.to!} className={cls}>{inner}</Link>;
  return (
    <div>
      <button
        className={cls}
        onClick={() => { setOpen((o) => !o); if (item.to) navigate(item.to); }}
      >
        {inner}
        <ChevronDown size={16} className={`transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="pl-4 mt-1 space-y-1">
          {kids.map((c) => <Item key={c.label} item={c} nested />)}
        </div>
      )}
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="w-[260px] shrink-0 h-screen flex flex-col p-4 overflow-y-auto">
      <div className="text-title mb-6 px-3 text-primary">{'<RE/AY>'}</div>
      <nav className="space-y-1">
        {navTop.map((i) => <Item key={i.label} item={i} />)}
      </nav>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
  {/* Other content */}
        <div
            style={{
              marginTop: "auto",
              padding: "10px 14px",
              width: "100%",
              backgroundColor: "#f2d0d0",
              color: "#bd1616",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: 500,
              boxSizing: "border-box",
            }}
          >
            Still in the tinkering phase. <br/>This is a frontend only implementation. Some interactions and functionality are still being worked on.
        </div>
  {/* Your note div goes here */}
      </div>
      
      <div className="mt-auto pt-4"><Item item={navProfile} /></div>
    </aside>
  );
}
