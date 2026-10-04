// ALL mock data lives here. Screens import from this file; never inline data in screens.
export const user = { name: 'Parth' };

export type WorkflowTemplate = {
  title: string;
  description: string;
  services: string;
  estimate: string;
  icons: string[];
};

export type Connector = {
  name: string;
  category: string;
  bestFor: string;
  description: string;
  plan: string;
  usage: string;
  usagePercent: number;
  icon: string;
  status: 'Connected' | 'Server not responding' | 'Configuration Missing';
};

export const connectors: Connector[] = [
  { name: 'Perplexity', category: 'Research & Discovery', bestFor: 'Live, citable web research.', description: 'Pulling current facts, comparisons, and examples grounded in real sources.', plan: 'Max Plan', usage: '760/1,000 (Resets in 9 hours)', usagePercent: 24, icon: 'property-1-perplexity.svg', status: 'Connected' },
  { name: 'Claude', category: 'Orchestrator', bestFor: 'Long context reasoning, structured writing, and synthesizing', description: 'messy inputs into one clear, well-organized output.', plan: 'Pro Plan', usage: '2,100/10,000 (Resets in 24 days)', usagePercent: 79, icon: 'property-1-claude.svg', status: 'Connected' },
  { name: 'Elicit ai', category: 'Academic Research', bestFor: 'AI-assisted academic and scientific research.', description: 'Finding papers, extracting data across studies, and drafting reviews with source citations.', plan: 'Education Plan', usage: '580/1,000 (Resets in 9 hours)', usagePercent: 38, icon: 'property-1-exa.svg', status: 'Server not responding' },
  { name: 'Notion', category: 'Source Analysis', bestFor: 'Centralizing docs, specs, and team wikis.', description: 'Your default destination for anything meant to be read, reviewed, or referenced later.', plan: 'Plus Plan', usage: '580/5,000 (Resets in 9 hours)', usagePercent: 13, icon: 'property-1-notion.svg', status: 'Connected' },
  { name: 'Cursor', category: 'Coding & Development', bestFor: 'Writing, refactoring, and debugging code directly inside a real', description: 'codebase with AI assisted inline edits.', plan: 'Ultra Plan', usage: '580/1,000 (Resets in 9 hours)', usagePercent: 74, icon: 'property-1-cursor.svg', status: 'Connected' },
  { name: 'Figma', category: 'Design & Prototyping', bestFor: 'Creating and editing real design files.', description: 'Mockups, prototypes, and layouts built on an existing design system.', plan: 'Professional Plan', usage: '580/1,000 (Resets in 9 hours)', usagePercent: 58, icon: 'property-1-figma.svg', status: 'Connected' },
  { name: 'Linear', category: 'Project Management', bestFor: 'Tracking issues, sprints, and product roadmaps.', description: 'The go-to destination whenever a task needs an owner and a status.', plan: 'Professional Plan', usage: '580/1,000 (Resets in 9 hours)', usagePercent: 14, icon: 'property-1-linear.svg', status: 'Connected' },
  { name: 'Supabase', category: 'Database', bestFor: 'Managing a live database, auth, and backend storage.', description: 'The record store for structured app data, not documents.', plan: 'Free Plan', usage: '580/1,000 (Resets in 9 hours)', usagePercent: 31, icon: 'property-1-supabase.svg', status: 'Configuration Missing' },
  { name: 'Pitch', category: 'Presentations', bestFor: 'Creating sharp, collaborative presentations.', description: 'Build polished decks from connected project context.', plan: 'Free Plan', usage: '580/1,000 (Resets in 9 hours)', usagePercent: 26, icon: 'property-1-pitch.svg', status: 'Connected' },
  { name: 'N8n', category: 'Automation', bestFor: 'Connecting tools and automating repetitive work.', description: 'Trigger multi-step workflows across your connected services.', plan: 'Free Plan', usage: '580/1,000 (Resets in 9 hours)', usagePercent: 42, icon: 'property-1-n8n.svg', status: 'Connected' },
];

export type DiscoverConnector = {
  name: string;
  description: string;
  icon: string;
};

export type DiscoverCategory = {
  name: string;
  items: DiscoverConnector[];
};

export const discoveryCategories: DiscoverCategory[] = [
  {
    name: 'Popular',
    items: [
      { name: 'Claude', description: 'Family of advance LLMs and conversational assistants built for work.', icon: 'property-1-claude.svg' },
      { name: 'Supabase', description: 'Build and manage your app’s database, auth and storage', icon: 'property-1-supabase.svg' },
      { name: 'Higgsfield', description: 'Generate images, videos, audio, and Soul characters with AI.', icon: 'property-1-higgsfield.svg' },
      { name: 'Linear', description: 'Plan and track projects, issues, and team workflows in Linear.', icon: 'property-1-linear.svg' },
      { name: 'N8n', description: 'Access and run your n8n workflows', icon: 'property-1-n8n.svg' },
      { name: 'Gmail', description: 'Search, create, and manage your emails and calendar events.', icon: 'property-1-gmail.svg' },
    ],
  },
  {
    name: 'Creativity',
    items: [
      { name: 'Figma', description: 'Create designs, ship to code', icon: 'property-1-figma.svg' },
      { name: 'Higgsfield', description: 'Generate images, videos, audio, and Soul characters with AI.', icon: 'property-1-higgsfield.svg' },
      { name: 'Lucid', description: 'Edit, diagrams and align teams', icon: 'property-1-lucid.svg' },
      { name: 'Adobe', description: 'Design, combine and edit', icon: 'property-1-adobe.svg' },
    ],
  },
  {
    name: 'Developer Tools',
    items: [
      { name: 'Cursor', description: 'AI-powered code editor to build your programmes', icon: 'property-1-cursor.svg' },
      { name: 'Vercel', description: 'Analyze, debug, and manage projects and deployments', icon: 'property-1-verce.svg' },
      { name: 'Antigravity', description: 'Autonomous AI agents handle end-to-end software building.', icon: 'property-1-antigravity.svg' },
      { name: 'Github', description: 'Search and manage your github repositories', icon: 'property-1-github.svg' },
    ],
  },
  {
    name: 'Automation & Workflows',
    items: [
      { name: 'N8n', description: 'Access and run your n8n workflows', icon: 'property-1-n8n.svg' },
      { name: 'Make', description: 'Connect apps and automate workflows without code.', icon: 'property-1-make.svg' },
    ],
  },
];

export type PermissionLevel = 'Allow' | 'Always Ask' | 'Disable';

export type ConnectorPermissionTool = {
  name: string;
  description: string;
  kind: 'MCP' | 'CLI';
  group: 'Read only tools' | 'Write & Delete tools';
};

const makePermissionTools = (connector: string, readOnly: string[], writeAndDelete: string[]): ConnectorPermissionTool[] => [
  ...readOnly.map((name, index) => ({ name, description: `${connector} access for ${name.toLowerCase()}.`, kind: index === readOnly.length - 1 ? 'CLI' as const : 'MCP' as const, group: 'Read only tools' as const })),
  ...writeAndDelete.map((name, index) => ({ name, description: `${connector} access for ${name.toLowerCase()}.`, kind: index === writeAndDelete.length - 1 ? 'CLI' as const : 'MCP' as const, group: 'Write & Delete tools' as const })),
];

export const connectorPermissionTools: Record<string, ConnectorPermissionTool[]> = {
  Claude: makePermissionTools('Claude', ['get_model_info', 'create_message', 'list_conversations', 'search_conversations', 'list_projects'], ['create_project', 'update_project', 'delete_conversation', 'archive_project']),
  Supabase: makePermissionTools('Supabase', ['execute_sql', 'list_tables', 'get_table_schema', 'list_migrations', 'list_projects'], ['apply_migration', 'create_branch', 'delete_branch', 'rebase_branch']),
  Higgsfield: makePermissionTools('Higgsfield', ['list_models', 'get_generation', 'list_generations', 'get_asset', 'list_assets'], ['generate_image', 'generate_video', 'delete_asset', 'update_generation']),
  Linear: makePermissionTools('Linear', ['list_issues', 'get_issue', 'list_projects', 'list_cycles', 'list_teams'], ['create_issue', 'update_issue', 'delete_issue', 'create_comment']),
  N8n: makePermissionTools('N8n', ['list_workflows', 'get_workflow', 'list_executions', 'get_execution', 'list_credentials'], ['create_workflow', 'update_workflow', 'delete_workflow', 'execute_workflow']),
  Gmail: makePermissionTools('Gmail', ['list_messages', 'get_message', 'search_messages', 'list_threads', 'get_thread'], ['send_message', 'create_draft', 'delete_message', 'modify_labels']),
  Figma: makePermissionTools('Figma', ['list_files', 'get_file', 'list_projects', 'get_comments', 'list_components'], ['create_file', 'update_file', 'delete_comment', 'create_comment']),
  Lucid: makePermissionTools('Lucid', ['list_documents', 'get_document', 'list_pages', 'get_comments', 'list_templates'], ['create_document', 'update_document', 'delete_document', 'create_comment']),
  Adobe: makePermissionTools('Adobe', ['list_assets', 'get_asset', 'search_assets', 'list_projects', 'get_project'], ['create_asset', 'update_asset', 'delete_asset', 'export_asset']),
  Cursor: makePermissionTools('Cursor', ['list_projects', 'get_project', 'list_files', 'search_code', 'get_branch'], ['create_branch', 'update_file', 'delete_file', 'create_pull_request']),
  Vercel: makePermissionTools('Vercel', ['list_projects', 'get_project', 'list_deployments', 'get_deployment', 'list_domains'], ['create_project', 'create_deployment', 'delete_deployment', 'update_domain']),
  Antigravity: makePermissionTools('Antigravity', ['list_agents', 'get_agent', 'list_runs', 'get_run', 'list_workspaces'], ['create_agent', 'run_agent', 'delete_agent', 'update_workspace']),
  Github: makePermissionTools('Github', ['list_repositories', 'get_repository', 'list_issues', 'list_pull_requests', 'get_file'], ['create_issue', 'create_pull_request', 'update_repository', 'delete_branch']),
  Make: makePermissionTools('Make', ['list_scenarios', 'get_scenario', 'list_runs', 'get_run', 'list_connections'], ['create_scenario', 'update_scenario', 'delete_scenario', 'run_scenario']),
};

export type UsagePeriod = '3 days' | '15 days' | '1 month' | '1 year' | 'All';

export type UsagePoint = {
  date: string;
  label: string;
  total: number;
  tools: { name: string; value: string; share: string }[];
};

export type UsageTool = {
  name: string;
  plan: string;
  usage: string;
  percent: number;
  status: 'Connected' | 'Server not responding';
  icon: string;
  subscriptionDue?: string;
};

const usageToolSnapshot = [
  { name: 'Perplexity', value: '1.9k', share: '15.8%' },
  { name: 'Figma', value: '2.1k', share: '17.4%' },
  { name: 'Claude', value: '3.22k', share: '26.7%' },
  { name: 'ChatGPT', value: '705', share: '5.8%' },
  { name: 'Notion', value: '1.1k', share: '3.4%' },
];

const makeUsagePoints = (dates: string[], totals: number[]): UsagePoint[] => dates.map((date, index) => ({
  date,
  label: date,
  total: totals[index],
  tools: usageToolSnapshot,
}));

export const usagePeriods: Record<UsagePeriod, { total: string; cost: string; efficiency: string; points: UsagePoint[] }> = {
  '3 days': {
    total: '184k', cost: '$4.18', efficiency: '91%',
    points: makeUsagePoints(['30 Sept, 2026', '1 Oct, 2026', '2 Oct, 2026'], [42000, 69000, 73000]),
  },
  '15 days': {
    total: '742k', cost: '$16.40', efficiency: '87%',
    points: makeUsagePoints(['18 Sept, 2026', '19 Sept, 2026', '20 Sept, 2026', '21 Sept, 2026', '22 Sept, 2026', '23 Sept, 2026', '24 Sept, 2026', '25 Sept, 2026', '26 Sept, 2026', '27 Sept, 2026', '28 Sept, 2026', '29 Sept, 2026', '30 Sept, 2026', '1 Oct, 2026', '2 Oct, 2026'], [33000, 28000, 47000, 51000, 62000, 43000, 58000, 68000, 49000, 72000, 61000, 55000, 64000, 70000, 73000]),
  },
  '1 month': {
    total: '1.5 M', cost: '$ 32', efficiency: '82%',
    points: makeUsagePoints(['8 Sept, 2026', '9 Sept, 2026', '10 Sept, 2026', '11 Sept, 2026', '12 Sept, 2026', '13 Sept, 2026', '14 Sept, 2026', '15 Sept, 2026', '16 Sept, 2026', '17 Sept, 2026', '18 Sept, 2026', '19 Sept, 2026', '20 Sept, 2026', '21 Sept, 2026', '22 Sept, 2026', '23 Sept, 2026', '24 Sept, 2026', '25 Sept, 2026', '26 Sept, 2026', '27 Sept, 2026', '28 Sept, 2026', '29 Sept, 2026', '30 Sept, 2026', '1 Oct, 2026', '2 Oct, 2026'], [42000, 37000, 55000, 59000, 72000, 66000, 82000, 54000, 64000, 53000, 76000, 61000, 49000, 68000, 68000, 90000, 61000, 52000, 69000, 68000, 69000, 56000, 58000, 86000, 110000]),
  },
  '1 year': {
    total: '14.8 M', cost: '$ 348', efficiency: '79%',
    points: makeUsagePoints(['Oct 2025', 'Nov 2025', 'Dec 2025', 'Jan 2026', 'Feb 2026', 'Mar 2026', 'Apr 2026', 'May 2026', 'Jun 2026', 'Jul 2026', 'Aug 2026', 'Sep 2026'], [920000, 1100000, 870000, 1240000, 970000, 1320000, 1140000, 1290000, 1360000, 1180000, 1410000, 1500000]),
  },
  All: {
    total: '18.2 M', cost: '$ 422', efficiency: '81%',
    points: makeUsagePoints(['Jan 2025', 'Apr 2025', 'Jul 2025', 'Oct 2025', 'Jan 2026', 'Apr 2026', 'Jul 2026', 'Oct 2026'], [620000, 980000, 1210000, 1100000, 1240000, 1510000, 1680000, 1820000]),
  },
};

export const usageTools: UsageTool[] = [
  { name: 'Perplexity', plan: 'Max Plan', usage: '760/1,000 (Resets in 9 hours)', percent: 24, status: 'Connected', icon: 'property-1-perplexity.svg' },
  { name: 'Claude', plan: 'Pro Plan', usage: '2,100/10,000 (Resets in 24 days)', percent: 79, status: 'Connected', icon: 'property-1-claude.svg', subscriptionDue: 'Subscription due in 3 days' },
  { name: 'Figma', plan: 'Professional Plan', usage: '580/1,000 (Resets in 9 hours)', percent: 58, status: 'Connected', icon: 'property-1-figma.svg' },
  { name: 'Elicit.ai', plan: 'Education Plan', usage: '580/1,000 (Resets in 9 hours)', percent: 38, status: 'Server not responding', icon: 'property-1-exa.svg' },
  { name: 'N8n', plan: 'Plus Plan', usage: '580/5,000 (Resets in 9 hours)', percent: 13, status: 'Connected', icon: 'property-1-n8n.svg' },
  { name: 'Cursor', plan: 'Ultra Plan', usage: '580/1,000 (Resets in 9 hours)', percent: 74, status: 'Connected', icon: 'property-1-cursor.svg' },
];

export type OrchestrationCategory = {
  name: string;
  tool: string;
  model: string;
  children?: { name: string; tool: string; model: string }[];
};

export const orchestrationToolOptions = ['-', 'ChatGPT', 'Perplexity', 'Elicit', 'NotebookLM', 'Claude', 'Cursor', 'Midjourney', 'n8n', 'Notion'];
export const orchestrationModelOptions = ['-', 'Default', 'GPT-5.6 Luna', '3.6 Pro', 'Opus 5', 'Opus5', 'v8.1', 'Sonnet 5', 'Opus 4.5'];

export const orchestrationCategories: OrchestrationCategory[] = [
  { 
    name: 'Ask & Answer', 
    tool: 'ChatGPT', 
    model: 'GPT-5.6 Luna' ,
    children: [
      { name: 'General Q&A', tool: 'ChatGPT', model: 'GPT-5.6 Luna' },
      { name: 'Deep reasoning, Tutoring', tool: 'ChatGPT', model: 'GPT-5.6 Luna' },
      { name: 'Source-backed Q&A', tool: 'ChatGPT', model: 'GPT-5.6 Luna' },
      { name: 'Multimodal Q&A', tool: 'ChatGPT', model: 'GPT-5.6 Luna' },
    ],
  },
  {
    name: 'Research & Discovery',
    tool: '-',
    model: '-',
    children: [
      { name: 'Search & discovery', tool: 'Perplexity', model: 'Default' },
      { name: 'Academic research', tool: 'Elicit', model: 'Default' },
      { name: 'Source analysis', tool: 'NotebookLM', model: '3.6 Pro' },
      { name: 'Synthesis & conclusions', tool: 'Claude', model: 'Opus 5' },
    ],
  },
  { 
    name: 'Writing & Communication', 
    tool: 'ChatGPT', 
    model: 'GPT-5.6 Luna',
    children: [
      { name: 'Ideation & outline', tool: 'ChatGPT', model: 'GPT-5.6 Luna' },
      { name: 'Draft & rewrite', tool: 'ChatGPT', model: 'GPT-5.6 Luna' },
      { name: 'Premium long-form', tool: 'ChatGPT', model: 'GPT-5.6 Luna' },
      { name: 'Edit, Tone, Polish', tool: 'ChatGPT', model: 'GPT-5.6 Luna' },
    ],
  },
  { 
    name: 'Analysis & Reasoning', 
    tool: 'Claude', 
    model: 'Opus5', 
    children: [
      { name: 'Data analysis', tool: 'Claude', model: 'Opus5' },
      { name: 'Comparative analysis', tool: 'Claude', model: 'Opus5' },
      { name: 'Problem solving', tool: 'Claude', model: 'Opus5' },
      { name: 'Decision, Scenario, Critique', tool: 'Claude', model: 'Opus5' },
    ],
  },
  { name: 'Coding & Development', 
   tool: 'Cursor', 
   model: 'Opus 5',
   children: [
      { name: 'Implementation', tool: 'Cursor', model: 'Opus 5' },
      { name: 'Architecture', tool: 'Cursor', model: 'Opus 5' },
      { name: 'Debug, Test', tool: 'Cursor', model: 'Opus 5' },
      { name: 'Review, Refactor, Docs', tool: 'Cursor', model: 'Opus 5' },
    ],
  },
  { 
    name: 'Creative Generation', 
    tool: 'Midjourney', 
    model: 'v8.1',
    children: [
      { name: 'Ideas & concepts', tool: 'Midjourney', model: 'v8.1' },
      { name: 'Stories, Scripts', tool: 'Midjourney', model: 'v8.1' },
      { name: 'Images', tool: 'Midjourney', model: 'v8.1' },
      { name: 'Multimedia concepts', tool: 'Midjourney', model: 'v8.1' },
    ],
  },
  { 
    name: 'Design & Prototyping', 
    tool: 'Figma AI', 
    model: 'Default',
    children: [
      { name: 'UX, User flows', tool: 'Figma AI', model: 'Default' },
      { name: 'Wireframes, UI', tool: 'Figma AI', model: 'Default' },
      { name: 'High-fidelity', tool: 'Figma AI', model: 'Default' },
      { name: 'Prototype', tool: 'Figma AI', model: 'Default' },
    ],
  },
  { 
    name: 'Data & Document Processing', 
    tool: 'NotebookLM', 
    model: '3.6 Pro',
    children: [
      { name: 'Document Q&A', tool: 'NotebookLM', model: '3.6 Pro' },
      { name: 'Extraction', tool: 'NotebookLM', model: '3.6 Pro' },
      { name: 'Comparison', tool: 'NotebookLM', model: '3.6 Pro' },
      { name: 'Data analysis', tool: 'NotebookLM', model: '3.6 Pro' },
    ],
  },
  { 
    name: 'Automation & Execution', 
    tool: 'n8n', 
    model: 'GPT-5.6 Luna',
    children: [
      { name: 'Orchestration', tool: 'n8n', model: 'GPT-5.6 Luna' },
      { name: 'Routing', tool: 'n8n', model: 'GPT-5.6 Luna' },
      { name: 'Complex decisions', tool: 'n8n', model: 'GPT-5.6 Luna' },
      { name: 'Actions, APIs, approvals', tool: 'n8n', model: 'GPT-5.6 Luna' },
    ],
  },
  { 
    name: 'Personal Assistance', 
    tool: 'Claude', 
    model: 'Sonnet 5',
    children: [
      { name: 'Everyday assistant', tool: 'Claude', model: 'Sonnet 5' },
      { name: 'Planning & Decisions', tool: 'Claude', model: 'Sonnet 5' },
      { name: 'Email, Communications', tool: 'Claude', model: 'Sonnet 5' },
      { name: 'Basic Research', tool: 'Claude', model: 'Sonnet 5' },
    ],
  },
  { 
    name: 'Planning & Organization', 
    tool: 'Notion', 
    model: 'Opus 4.5',
    children: [
      { name: 'Knowledge management', tool: 'Notion', model: 'Opus 4.5' },
      { name: 'Project decomposition', tool: 'Notion', model: 'Opus 4.5' },
      { name: 'Prioritization, Scheduling', tool: 'Notion', model: 'Opus 4.5' },
      { name: 'Project execution', tool: 'Notion', model: 'Opus 4.5' },
    ],
  },
];

export const workflowTemplates: WorkflowTemplate[] = [
  {
    title: 'Research Recap to Audio Briefing',
    description: 'Synthesizes a set of source documents grounded in NotebookLM, has Claude turn the findings into a spoken-word script, and generates a short narrated audio briefing.',
    services: 'Notebook LM + Claude + Eleven Labs',
    estimate: 'Estimated: 3 steps · 5 mins',
    icons: ['property-1-notebooklm-s.svg', 'property-1-claude-s.svg', 'property-1-elevenlabs-s.svg'],
  },
  {
    title: 'Investor Update Generator',
    description: "Researches comparable-company benchmarks, pulls this month's real metrics from Sheets, drafts the narrative in Claude, and builds an investor-ready slide in Pitch.",
    services: 'Perplexity + Claude + Google Sheets + Pitch',
    estimate: 'Estimated: 4 steps · 3 mins',
    icons: ['property-1-perplexity-s.svg', 'property-1-claude-s.svg', 'property-1-frame-594-s.svg', 'property-1-pitch-s.svg'],
  },
  {
    title: 'Recurring Competitor Watch',
    description: 'Checks competitor pricing and feature pages on a weekly schedule, has Claude diff and summarize what changed, and triggers an n8n automation to notify the team only when something actually moved.',
    services: 'Perplexity + Claude + n8n',
    estimate: 'Estimated: 3 steps · 55 sec',
    icons: ['property-1-perplexity-s.svg', 'property-1-claude-s.svg', 'property-1-n8n-s.svg'],
  },
  {
    title: 'Bug Triage & Sprint Sync',
    description: "Pulls open bugs from Linear, has Claude cluster and prioritize them by severity and repeat pattern, then writes a weekly triage summary into the team's Notion sprint doc.",
    services: 'Linear + Claude + Notion',
    estimate: 'Estimated: 3 steps · 40 sec',
    icons: ['property-1-linear-s.svg', 'property-1-claude-s.svg', 'property-1-notion-s.svg'],
  },
];
