import { useMemo, useState, type MouseEvent } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import {
  connectorPermissionTools,
  connectors,
  discoveryCategories,
  orchestrationCategories,
  orchestrationModelOptions,
  orchestrationToolOptions,
  usagePeriods,
  usageTools,
  type Connector,
  type ConnectorPermissionTool,
  type DiscoverCategory,
  type PermissionLevel,
  type OrchestrationCategory,
  type UsagePeriod,
} from '../data/mock';

const categories = ['All Categories', ...Array.from(new Set([...connectors.map((connector) => connector.category), ...discoveryCategories.map((category) => category.name)]))];

type View = 'Yours' | 'Discover';
type RoutingValues = Record<string, string>;

function StatusPill({ status }: { status: Connector['status'] }) {
  const styles = {
    Connected: 'bg-alert-green-bg text-alert-green',
    'Server not responding': 'bg-alert-red-bg text-alert-red',
    'Configuration Missing': 'bg-alert-yellow-bg text-alert-yellow',
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-caption-small ${styles[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function ConnectorCard({ connector }: { connector: Connector }) {
  return (
    <Card className="p-2.5 border border-grey-20">
      <div className="flex items-start gap-2">
        <img src={`/assets/icons/${connector.icon}`} alt="" className="h-12 w-12 shrink-0 rounded-md" />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h2 className="text-title text-grey-90">{connector.name}</h2>
              <p className="text-body text-grey-50">{connector.category}</p>
            </div>
            <div className="flex items-center gap-2 text-grey-90">
              <button type="button" aria-label={`Read about ${connector.name}`} className="rounded-sm p-1 transition hover:bg-primary-bg">
                <img src="/assets/icons/documentation.svg" alt="" className="h-5 w-5" />
              </button>
              <button type="button" aria-label={`More options for ${connector.name}`} className="rounded-sm p-1 transition hover:bg-primary-bg">
                <img src="/assets/icons/menu.svg" alt="" className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <p className="text-small mt-2 min-h-[30px] text-grey-65"><span className="text-body-bold text-grey-80">Best for:</span> {connector.bestFor} {connector.description}</p>
      <div className="mt-2 flex items-center justify-between gap-3">
        <span className="text-code-small text-grey-80">{connector.plan}</span>
        <span className="text-code-small text-grey-80">{connector.usagePercent}% used</span>
      </div>
      <div className="mt-1 h-1 rounded-full bg-grey-35">
        <div className="h-1 rounded-full bg-grey-80" style={{ width: `${connector.usagePercent}%` }} />
      </div>
      <div className="mt-1 flex items-center justify-between gap-2">
        <span className="text-code-small text-grey-80">{connector.usage}</span>
        <StatusPill status={connector.status} />
      </div>
    </Card>
  );
}

function DiscoveryCard({ name, description, icon, connected, onOpen }: { name: string; description: string; icon: string; connected: boolean; onOpen: () => void }) {
  return (
    <Card className="flex min-h-[68px] items-center gap-2 border border-grey-20 px-2.5 py-2">
      <img src={`/assets/icons/${icon}`} alt="" className="h-12 w-12 shrink-0 rounded-md" />
      <div className="min-w-0 flex-1">
        <h3 className="text-title text-grey-90">{name}</h3>
        <p className="text-small truncate text-grey-65">{description}</p>
      </div>
      <button type="button" onClick={connected ? undefined : onOpen} disabled={connected} aria-label={connected ? `${name} connected` : `Add ${name}`} className={`shrink-0 rounded-full p-3 text-grey-90 ${connected ? 'cursor-default' : 'transition hover:bg-primary-bg hover:rounded-md hover:text-primary'}`}>
        <img src={connected ? '/assets/icons/tick.svg' : '/assets/icons/add.svg'} alt="" className="h-6 w-6" />
      </button>
    </Card>
  );
}

const permissionLevels: PermissionLevel[] = ['Allow', 'Always Ask', 'Disable'];
const permissionGroups: ConnectorPermissionTool['group'][] = ['Read only tools', 'Write & Delete tools'];

function formatToolName(name: string) {
  return name.split('_').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
}

function PermissionChoice({ value, onChange }: { value: PermissionLevel; onChange: (value: PermissionLevel) => void }) {
  return (
    <div className="flex shrink-0 rounded-full bg-grey-20 p-0.5">
      {permissionLevels.map((level) => (
        <button key={level} type="button" onClick={() => onChange(level)} className={`rounded-full px-3 py-1 text-small transition ${value === level ? 'bg-white text-grey-90 shadow-1' : 'text-grey-65 hover:text-grey-90'}`}>
          {level}
        </button>
      ))}
    </div>
  );
}

function ConnectionPermissionsModal({ connectorName, onClose }: { connectorName: string; onClose: () => void }) {
  const connector = discoveryCategories.flatMap((section) => section.items).find((item) => item.name === connectorName);
  const tools = connectorPermissionTools[connectorName] ?? [];
  const [searchQuery, setSearchQuery] = useState('');
  const [openGroups, setOpenGroups] = useState<Record<ConnectorPermissionTool['group'], boolean>>({ 'Read only tools': true, 'Write & Delete tools': false });
  const [permissions, setPermissions] = useState<Record<string, PermissionLevel>>(() => Object.fromEntries(tools.map((tool) => [tool.name, 'Allow'])));
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const getGroupValue = (group: ConnectorPermissionTool['group']) => {
    const values = tools.filter((tool) => tool.group === group).map((tool) => permissions[tool.name]);
    return values.length > 0 && values.every((value) => value === values[0]) ? values[0] : 'Mixed';
  };

  const setGroupPermission = (group: ConnectorPermissionTool['group'], value: string) => {
    if (!permissionLevels.includes(value as PermissionLevel)) return;
    setPermissions((current) => Object.fromEntries(Object.entries(current).map(([name, currentValue]) => [name, tools.find((tool) => tool.name === name)?.group === group ? value : currentValue])) as Record<string, PermissionLevel>);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 md:p-3">
      <div className="flex max-h-[90vh] w-[90vw] max-w-[1800px] flex-col overflow-hidden rounded-lg bg-grey-10">
        <header className="flex shrink-0 items-start gap-4 p-3 md:p-3">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            {connector && <img src={`/assets/icons/${connector.icon}`} alt="" className="h-14 w-14 shrink-0 rounded-md" />}
            <div className="min-w-0">
              <h1 className="text-h1 text-grey-90">{connectorName}</h1>
              <p className="text-body text-grey-65">{connector?.description}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button type="button" className="h-9 rounded-full px-4">Connect to Relay</Button>
            <button type="button" onClick={onClose} aria-label="Close permissions" className="rounded-full p-2 text-grey-90 transition hover:bg-grey-20"><X size={22} /></button>
          </div>
        </header>
        <div className="flex min-h-0 flex-1">
          <aside className="hidden w-[236px] shrink-0 overflow-y-auto p-4 md:block">
            <p className="text-small text-grey-50">Overview</p>
            <p className="text-body mt-2 text-grey-80">Manage {connectorName} directly through Relay. Review the available tools and choose what this connection can access.</p>
            <p className="text-small mt-8 text-grey-50">Signin</p>
            <p className="text-body mt-2 text-grey-80">Required</p>
            <p className="text-small mt-8 text-grey-50">Links</p>
            <div className="mt-2 space-y-1"><button type="button" className="text-body text-primary underline">Website</button><button type="button" className="text-body block text-primary underline">Documentation</button><button type="button" className="text-body block text-primary underline">Support</button></div>
          </aside>
          <section className="min-h-0 min-w-0 flex-1 overflow-y-hidden p-4 md:p-5 mr-2 mb-2 rounded-md bg-white shadow-1" >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-h2 text-grey-65">Tools and Permissions</h2>
              <div className="relative sm:w-[360px]">
                <Input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search tools..." aria-label="Search tools" className="pr-10" />
                <Search size={20} className="pointer-events-none absolute right-3 top-3 text-grey-80" />
              </div>
            </div>
            <div className="mt-3 space-y-2">
              {permissionGroups.map((group) => {
                const groupTools = tools.filter((tool) => tool.group === group && (!normalizedQuery || `${tool.name} ${tool.description}`.toLowerCase().includes(normalizedQuery)));
                const groupValue = getGroupValue(group);
                return (
                  <div key={group}>
                    <div className="flex items-center gap-2 rounded-md bg-grey-80 px-3 py-2 text-white">
                      <button type="button" onClick={() => setOpenGroups((current) => ({ ...current, [group]: !current[group] }))} aria-label={`${openGroups[group] ? 'Collapse' : 'Expand'} ${group}`}><ChevronDown size={20} className={`transition ${openGroups[group] ? 'rotate-180' : ''}`} /></button>
                      <span className="text-body-bold flex-1">{group}</span>
                      <select value={groupValue} onChange={(event) => setGroupPermission(group, event.target.value)} className="h-8 rounded-md bg-white px-3 text-button text-grey-90 outline-none">
                        {[...permissionLevels, 'Mixed'].map((level) => <option key={level}>{level}</option>)}
                      </select>
                    </div>
                    {openGroups[group] && (
                      <div className="px-1">
                        {groupTools.map((tool) => (
                          <div key={tool.name} className="flex flex-col gap-2 border-b border-grey-35 py-3 lg:flex-row lg:items-center lg:gap-4">
                            <div className="min-w-0 lg:w-[290px]">
                              <h3 className="text-title text-grey-90">{formatToolName(tool.name)}</h3>
                              <div className="mt-1 flex items-center gap-2"><span className="text-code-small text-grey-65">{tool.name}</span><span className="rounded-full bg-primary-bg px-2 py-0.5 text-caption-small text-primary">{tool.kind}</span></div>
                            </div>
                            <p className="text-small min-w-0 flex-1 text-grey-65">{tool.description}</p>
                            <PermissionChoice value={permissions[tool.name]} onChange={(value) => setPermissions((current) => ({ ...current, [tool.name]: value }))} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function DiscoverSection({ query, category, onOpen, onCategoryChange }: { query: string; category: string; onOpen: (name: string) => void; onCategoryChange: (category: string) => void }) {
  const normalizedQuery = query.trim().toLowerCase();
  const connectedNames = new Set(connectors.map((connector) => connector.name.toLowerCase()));
  const visibleCategories: DiscoverCategory[] = discoveryCategories
    .filter((section) => category === 'All Categories' || section.name === category)
    .map((section) => ({ ...section, items: section.items.filter((item) => !normalizedQuery || `${item.name} ${item.description}`.toLowerCase().includes(normalizedQuery)) }))
    .filter((section) => section.items.length > 0);

  return (
    <div className="mt-4 space-y-4">
      {visibleCategories.map((section) => (
        <section key={section.name}>
          <div className="mb-1 flex items-center justify-between">
            <h2 className="text-body text-grey-65">{section.name}</h2>
            <button type="button" onClick={() => onCategoryChange(section.name)} className="text-small text-primary underline underline-offset-2">View All</button>
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            {section.items.map((item) => <DiscoveryCard key={`${section.name}-${item.name}`} {...item} connected={connectedNames.has(item.name.toLowerCase())} onOpen={() => onOpen(item.name)} />)}
          </div>
        </section>
      ))}
      {visibleCategories.length === 0 && <p className="text-body mt-8 text-center text-grey-65">No connectors match your filters.</p>}
    </div>
  );
}

function UsageStatisticsView() {
  const periods: UsagePeriod[] = ['15 days', '1 month', '1 year', 'All'];
  const [period, setPeriod] = useState<UsagePeriod>('15 days');
  const [hoveredIndex, setHoveredIndex] = useState(1);
  const dataset = usagePeriods[period];
  const maxTotal = Math.max(...dataset.points.map((point) => point.total));
  const chartWidth = 860;
  const chartHeight = 180;
  const chartPoints = dataset.points.map((point, index) => ({
    x: dataset.points.length === 1 ? chartWidth / 2 : (index / (dataset.points.length - 1)) * chartWidth,
    y: 142 - (point.total / maxTotal) * 100,
  }));
  const linePoints = chartPoints.map((point) => `${point.x},${point.y}`).join(' ');
  const areaPath = `M ${chartPoints[0].x},158 L ${chartPoints.map((point) => `${point.x},${point.y}`).join(' L ')} L ${chartPoints[chartPoints.length - 1].x},158 Z`;
  const activePoint = dataset.points[Math.min(hoveredIndex, dataset.points.length - 1)];
  const tooltipLeft = chartPoints.length === 1 ? 50 : (Math.min(hoveredIndex, chartPoints.length - 1) / (chartPoints.length - 1)) * 100;

  const handleChartMove = (event: MouseEvent<SVGSVGElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const position = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    setHoveredIndex(Math.round(position * (dataset.points.length - 1)));
  };

  return (
    <div className="mx-auto mt-8 max-w-[860px]">
      <div className="flex items-center justify-between gap-4">
        <div className="flex rounded-full bg-grey-20 p-0.5">
          {periods.map((option) => (
            <button key={option} type="button" onClick={() => { setPeriod(option); setHoveredIndex(Math.min(1, usagePeriods[option].points.length - 1)); }} className={`rounded-full px-4 py-1.5 text-small transition ${period === option ? 'bg-white text-grey-90 shadow-1' : 'text-grey-65 hover:text-grey-90'}`}>
              {option}
            </button>
          ))}
        </div>
        <select className="h-8 rounded-md border-0 bg-grey-20 px-3 text-button text-grey-80 outline-none">
          <option>All Categories</option>
          <option>Research &amp; Discovery</option>
          <option>Coding &amp; Development</option>
          <option>Design &amp; Prototyping</option>
        </select>
      </div>

      <div className="mt-4 grid gap-2 md:grid-cols-3">
        {[
          ['Total token consumption', dataset.total],
          ['Effective cost', dataset.cost],
          ['Compute Efficiency', dataset.efficiency],
        ].map(([label, value]) => (
          <Card key={label} className="px-4 py-3 border border-grey-20 shadow-1">
            <p className="text-h1 text-grey-90">{value}</p>
            <p className="text-body text-grey-65">{label}</p>
          </Card>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="text-h2 text-grey-65">Daily token consumption</h2>
        <div className="relative mt-2 h-[210px]">
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none" className="h-full w-full" onMouseMove={handleChartMove} role="img" aria-label="Daily token consumption chart">
            <defs>
              <linearGradient id="usage-area-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D05D11" />
                <stop offset="100%" stopColor="#D05D1100" />
              </linearGradient>
            </defs>
            <path d={areaPath} fill="url(#usage-area-gradient)" className="opacity-80" />
            <polyline points={linePoints} fill="none" className="stroke-primary" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            <circle cx={chartPoints[Math.min(hoveredIndex, chartPoints.length - 1)].x} cy={chartPoints[Math.min(hoveredIndex, chartPoints.length - 1)].y} r={6} className="fill-white stroke-primary" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            {/* <line x1="0" y1="158" x2={chartWidth} y2="158" className="stroke-grey-50" strokeWidth="1" vectorEffect="non-scaling-stroke" /> */}
          </svg>
          <div className="pointer-events-none absolute top-3 w-[178px] -translate-x-1/2 rounded-md border border-grey-35 bg-grey-10/95 p-2 shadow-1" style={{ left: `${tooltipLeft}%` }}>
            <p className="text-code-small text-grey-90">{activePoint.date}</p>
            <div className="mt-1 space-y-0.5">
              {activePoint.tools.map((tool) => (
                <div key={tool.name} className="flex items-center justify-between gap-2 text-small text-grey-80">
                  <span>{tool.name}</span>
                  <span>{tool.value} ({tool.share})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-7">
        <h2 className="text-h2 text-grey-65">Tools usage</h2>
        <div className="mt-2 grid gap-2 md:grid-cols-2">
          {usageTools.map((tool) => (
            <Card key={tool.name} className="px-2.5 py-2 border border-grey-20">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-title text-grey-90">{tool.name}</h3>
                <button type="button" aria-label={`More options for ${tool.name}`} className="rounded-sm p-1 transition hover:bg-primary-bg"><img src="/assets/icons/menu.svg" alt="" className="h-5 w-5" /></button>
              </div>
              <div className="mt-1 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-code-small text-grey-80">{tool.plan}</span>
                  {tool.subscriptionDue && <span className="rounded-full bg-alert-yellow-bg px-2 py-0.5 text-caption-small text-alert-yellow">{tool.subscriptionDue}</span>}
                </div>
                <span className="text-code-small text-grey-80">{tool.percent}% used</span>
              </div>
              <div className="mt-1 h-1 rounded-full bg-grey-35"><div className="h-1 rounded-full bg-grey-80" style={{ width: `${tool.percent}%` }} /></div>
              <div className="mt-1 flex items-center justify-between gap-2">
                <span className="text-code-small text-grey-80">{tool.usage}</span>
                <StatusPill status={tool.status} />
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

function RoutingSelect({ value, options, onChange }: { value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <div className="relative min-w-0 flex-1">
      <select value={value} onChange={(event) => onChange(event.target.value)} className="h-8 w-full appearance-none rounded-md border-0 bg-grey-20 px-3 pr-8 text-body text-grey-90 outline-none focus:ring-1 focus:ring-primary">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
      <img src="/assets/icons/down.svg" alt="" className="pointer-events-none absolute right-2 top-2 h-4 w-4" />
    </div>
  );
}

function categoryMatches(category: OrchestrationCategory, query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;
  return `${category.name} ${category.tool} ${category.model} ${category.children?.map((child) => `${child.name} ${child.tool} ${child.model}`).join(' ') ?? ''}`.toLowerCase().includes(normalizedQuery);
}

function initialRouting(): RoutingValues {
  return Object.fromEntries(orchestrationCategories.flatMap((category) => [
    [`${category.name}:tool`, category.tool],
    [`${category.name}:model`, category.model],
    ...(category.children ?? []).flatMap((child) => [[`${category.name}/${child.name}:tool`, child.tool], [`${category.name}/${child.name}:model`, child.model]]),
  ]));
}

export default function ConnectionsHub() {
  const [activeTab, setActiveTab] = useState('Connections & Integrations');
  const [view, setView] = useState<View>('Yours');
  const [category, setCategory] = useState('All Categories');
  const [query, setQuery] = useState('');
  const [showAddMessage, setShowAddMessage] = useState(false);
  const [selectedConnector, setSelectedConnector] = useState<string | null>(null);
  const [orchestrationMode, setOrchestrationMode] = useState<'Auto Orchestrate' | 'Manual Control'>('Manual Control');
  const [orchestrationQuery, setOrchestrationQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState('Research & Discovery');
  const [routing, setRouting] = useState<RoutingValues>(initialRouting);
  const [saved, setSaved] = useState(false);

  const visibleConnectors = useMemo(() => connectors.filter((connector) => {
    const matchesView = view === 'Yours' || connector.status !== 'Connected';
    const matchesCategory = category === 'All Categories' || connector.category === category;
    const normalizedQuery = query.trim().toLowerCase();
    const matchesQuery = !normalizedQuery || `${connector.name} ${connector.category} ${connector.bestFor}`.toLowerCase().includes(normalizedQuery);
    return matchesView && matchesCategory && matchesQuery;
  }), [category, query, view]);

  const visibleOrchestrationCategories = useMemo(() => orchestrationCategories.filter((item) => categoryMatches(item, orchestrationQuery)), [orchestrationQuery]);
  const setRouteValue = (key: string, value: string) => {
    setRouting((current) => ({ ...current, [key]: value }));
    setSaved(false);
  };

  const renderRouteRow = (name: string, toolKey: string, modelKey: string, indent = false) => (
    <div className={`flex items-center gap-2 border-b border-grey-35 py-1.5 last:border-b-0 ${indent ? 'pl-10' : ''}`} key={name}>
      <span className="text-body min-w-0 flex-1 text-grey-90">{name}</span>
      <RoutingSelect value={routing[toolKey]} options={orchestrationToolOptions} onChange={(value) => setRouteValue(toolKey, value)} />
      <RoutingSelect value={routing[modelKey]} options={orchestrationModelOptions} onChange={(value) => setRouteValue(modelKey, value)} />
    </div>
  );

  return (
    <main className="min-h-full bg-grey-10 p-2 md:p-3">
      <section className="relative min-h-[calc(100vh-24px)] overflow-hidden rounded-lg bg-white px-2 pb-8 pt-2 shadow-1 md:px-3 md:pb-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex max-w-full overflow-x-auto rounded-md bg-grey-20 p-0.5">
            {['Connections & Integrations', 'Usage & Statistics', 'Orchestration'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 rounded-md px-4 py-2 text-button transition ${activeTab === tab ? 'bg-white text-grey-90 shadow-1' : 'text-grey-65 hover:text-grey-90'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          {activeTab === 'Orchestration' ? (
            <div className="flex shrink-0 gap-2">
              <Button type="button" variant="secondary" onClick={() => { setRouting(initialRouting()); setSaved(false); }} className="h-9 rounded-full border border-primary px-4">Cancel</Button>
              <Button type="button" onClick={() => setSaved(true)} className="h-9 rounded-full px-4">Save Changes</Button>
            </div>
          ) : (
            <div className="flex shrink-0 gap-2">
              <Button type="button" variant="secondary" onClick={() => setShowAddMessage(false)} className="h-9 rounded-full border border-primary px-4">Cancel</Button>
              <Button type="button" onClick={() => setShowAddMessage((shown) => !shown)} className="h-9 rounded-full px-4">Add Connection</Button>
            </div>
          )}
        </div>

        {activeTab === 'Connections & Integrations' && (
          <div className="mx-auto mt-8 max-w-[860px]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex w-fit rounded-full bg-grey-20 p-0.5">
                {(['Yours', 'Discover'] as View[]).map((option) => (
                  <button key={option} type="button" onClick={() => setView(option)} className={`rounded-full px-4 py-1.5 text-small transition ${view === option ? 'bg-white text-grey-90 shadow-1' : 'text-grey-65'}`}>{option}</button>
                ))}
              </div>
              <select value={category} onChange={(event) => setCategory(event.target.value)} className="h-8 rounded-md border-0 bg-grey-20 px-3 text-button text-grey-80 outline-none">
                {categories.map((option) => <option key={option}>{option}</option>)}
              </select>
            </div>
            <div className="relative mt-4">
              <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Connectors" aria-label="Search connectors" className="pr-12" />
              <img src="/assets/icons/search.svg" alt="" className="pointer-events-none absolute right-3 top-3 h-6 w-6" />
            </div>
            {showAddMessage && <p className="text-small mt-3 rounded-md bg-primary-bg px-3 py-2 text-primary">Connection added to your workspace.</p>}
            {view === 'Yours' ? (
              <>
                <div className="mt-2 grid gap-2 md:grid-cols-2">
                  {visibleConnectors.map((connector) => <ConnectorCard key={connector.name} connector={connector} />)}
                </div>
                {visibleConnectors.length === 0 && <p className="text-body mt-8 text-center text-grey-65">No connectors match your filters.</p>}
              </>
            ) : (
              <DiscoverSection query={query} category={category} onOpen={setSelectedConnector} onCategoryChange={setCategory} />
            )}
          </div>
        )}

        {activeTab === 'Orchestration' && (
          <div className="mx-auto mt-7 max-w-[986px]">
            <div className="grid gap-2 md:grid-cols-2">
              {(['Auto Orchestrate', 'Manual Control'] as const).map((mode) => (
                <button key={mode} type="button" onClick={() => setOrchestrationMode(mode)} className={`flex min-h-[68px] items-start gap-3 rounded-md border border-grey-35 px-3 py-2 text-left transition ${orchestrationMode === mode ? (mode === 'Manual Control' ? 'bg-grey-80 text-white' : 'bg-white shadow-1') : 'bg-white hover:border-primary'}`}>
                  <span className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${orchestrationMode === mode ? 'border-primary' : 'border-grey-65'}`}>
                    {orchestrationMode === mode && <span className="h-2 w-2 rounded-full bg-primary" />}
                  </span>
                  <span>
                    <span className="text-body-bold block">{mode}</span>
                    <span className={`text-small block leading-[15px] ${orchestrationMode === mode && mode === 'Manual Control' ? 'text-grey-20' : 'text-grey-65'}`}>
                      {mode === 'Auto Orchestrate' ? 'Relay automatically routes each subtask to the best available tool and balances quality, speed, and cost. Writes, updates and deletes still need approval' : 'Take full control and assign each subtask to a specific tool yourself, step by step. No automatic routing. Take full control, exactly the way you want it.'}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            <div className="relative mt-4">
              <Input value={orchestrationQuery} onChange={(event) => setOrchestrationQuery(event.target.value)} placeholder="Search Tasks & Subtasks" aria-label="Search orchestration tasks" className="pr-12" />
              <img src="/assets/icons/search.svg" alt="" className="pointer-events-none absolute right-3 top-3 h-6 w-6" />
            </div>

            <div className="mt-2">
              {visibleOrchestrationCategories.map((item) => {
                const isExpanded = expandedCategory === item.name;
                return (
                  <div key={item.name}>
                    <div className="flex items-center gap-2 border-b border-grey-35 py-1.5">
                      <button type="button" aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${item.name}`} onClick={() => item.children && setExpandedCategory(isExpanded ? '' : item.name)} className="flex h-5 w-5 items-center justify-center">
                        <img src="/assets/icons/downlinear.svg" alt="" className={`h-4 w-4 transition ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                      <span className="text-body min-w-0 flex-1 text-grey-90">{item.name}</span>
                      <RoutingSelect value={routing[`${item.name}:tool`]} options={orchestrationToolOptions} onChange={(value) => setRouteValue(`${item.name}:tool`, value)} />
                      <RoutingSelect value={routing[`${item.name}:model`]} options={orchestrationModelOptions} onChange={(value) => setRouteValue(`${item.name}:model`, value)} />
                    </div>
                    {isExpanded && item.children?.map((child) => renderRouteRow(child.name, `${item.name}/${child.name}:tool`, `${item.name}/${child.name}:model`, true))}
                  </div>
                );
              })}
            </div>
            {saved && <p className="text-small mt-3 text-alert-green">Orchestration settings saved.</p>}
          </div>
        )}

        {activeTab === 'Usage & Statistics' && <UsageStatisticsView />}
        {selectedConnector && <ConnectionPermissionsModal key={selectedConnector} connectorName={selectedConnector} onClose={() => setSelectedConnector(null)} />}
      </section>
    </main>
  );
}
