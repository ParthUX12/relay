// All content for the Seed Deck session. Drop-in file: Bolt should import from here, not retype.
export type Status = 'done' | 'processing' | 'queued' | 'approval';

export type ToolNodeData = {
  logo: string;        // path under /assets/icons
  name: string;
  subtitle: string;
  tokens?: string;
  status: Status;
  steps: string[];
  visible?: boolean;   // set by FlowCanvas
} & Record<string, unknown>;

// Order = reveal order on the canvas.
export const nodeSeeds: { id: string; position: { x: number; y: number }; data: ToolNodeData }[] = [
  { id: 'perplexity', position: { x: 0, y: 0 }, data: {
    logo: '/assets/icons/property-1-perplexity.svg', name: 'Perplexity', subtitle: 'Research Pitch Deck Patterns', tokens: '540/10,000', status: 'queued',
    steps: [
      'Researches seed-stage deck patterns for comparable B2B SaaS.',
      'Reviews detailed teardown analyses beyond headline results.',
      'Identifies traction metrics, growth framing, and omissions.',
      'Creates a Pattern Brief for the positioning stage',
    ] } },
  { id: 'sheet', position: { x: 470, y: 0 }, data: {
    logo: '/assets/icons/property-1-sheets-s.svg', name: 'Google Sheet', subtitle: 'Fetch Verified Traction Data', status: 'approval',
    steps: [
      "Connects to the company's Metrics — Master sheet.",
      'Pulls current MoM growth and 90-day retention figures.',
      'Verifies the figures are current and not estimated.',
      'Passes the raw metrics to Claude for validation.',
    ] } },
  { id: 'claude1', position: { x: 470, y: 230 }, data: {
    logo: '/assets/icons/property-1-claude-s.svg', name: 'Claude', subtitle: 'Validate And Frame Metrics', tokens: '208/1000', status: 'queued',
    steps: [
      'Receives the verified metrics from Google Sheets',
      'Cross-checks metrics against the research patterns.',
      'Formats growth and retention for investor presentation.',
      'Flags the enterprise-deal growth distortion for disclosure.',
    ] } },
  { id: 'claude2', position: { x: 240, y: 540 }, data: {
    logo: '/assets/icons/property-1-claude-s.svg', name: 'Claude', subtitle: 'Combine Research, Data, Narrative', tokens: '320/798', status: 'queued',
    steps: [
      'Combines the Pattern Brief from Step 1 with verified data.',
      "Reads the company's product description from the Knowledge base.",
      'Builds the narrative around the identified "why now" opportunity.',
      'Creates a slide-by-slide outline with titles and key messages.',
      'Merges verified traction figures into the appropriate slide.',
      'Packages the complete, presentation-ready payload for Pitch.',
    ] } },
  { id: 'pitch', position: { x: 240, y: 900 }, data: {
    logo: '/assets/icons/property-1-pitch-s.svg', name: 'Pitch', subtitle: 'Build Branded Pitch Deck', tokens: '1002/5000', status: 'queued',
    steps: [
      "Reads the company's Pitch brand kit and existing layouts.",
      'Creates "Seed Deck — Outline v1" from Claude\'s payload.',
      'Applies existing brand styles and presentation components.',
      'Adds the verified traction data and required footnote.',
      'Marks team headshots and market-size visual as placeholders.',
    ] } },
  { id: 'notion', position: { x: 240, y: 1200 }, data: {
    logo: '/assets/icons/property-1-notion-s.svg', name: 'Notion', subtitle: 'Create Collaborative Review Workspace', status: 'approval',
    steps: [
      'Creates "Seed Deck — Review" in the shared workspace.',
      'Adds the narrative rationale and data-quality footnote.',
      'Links the Pitch deck for review.',
      'Lists unresolved visuals as explicit review tasks.',
      'Shares the page with the co-founder if already connected.',
    ] } },
];

export const edgeSeeds = [
  { id: 'e1', source: 'sheet', target: 'claude1' },
  { id: 'e2', source: 'claude1', target: 'claude2' },
  { id: 'e3', source: 'perplexity', target: 'claude2' },
  { id: 'e4', source: 'claude2', target: 'pitch' },
  { id: 'e5', source: 'pitch', target: 'notion' },
];

export const chat = {
  title: 'Seed Deck Outline — Pitch + Notion',
  userMessage:
    "We're pitching investors next week for our seed round. Research how similar seed-stage SaaS companies frame their traction slide, then draft our positioning, build a pitch deck outline in Pitch using our brand kit, and log the deck plan in Notion so my co-founder can review it.",
  intro:
    "Got it — I'll research how seed-stage SaaS traction slides are framed, draft your positioning, build the deck outline in Pitch, and log it in Notion for your co-founder.",
  planLead: "Here's the plan →",
  planSummary: '6 steps · Perplexity + Google Sheet → Claude → Claude → Pitch → Notion',
  planRows: [
    ['Research pitch deck patterns', 'Perplexity', 'Live examples of how comparable seed-stage decks frame traction'],
    ['Pull verified traction data', 'Google Sheets', 'Gets your real MoM growth and retention numbers, not a guess'],
    ['Validate and frame metrics', 'Claude', 'Cross-checks the numbers against research patterns, flags anything that needs disclosure'],
    ['Combine research, data, narrative', 'Claude', 'Merges the pattern brief and verified metrics into one slide-by-slide outline'],
    ['Build branded pitch deck', 'Pitch', 'Builds directly on your brand kit'],
    ['Create collaborative review workspace', 'Notion', 'Where you and your co-founder already review things'],
  ] as [string, string, string][],
  closing:
    "Research and the two Claude steps run automatically. I'll pause and show you a preview before anything gets written into Pitch or Notion.",
  estimate: 'Est. cost: $0.34 · Est. time: ~2.5 min',
};

export const sessionHistory = [
  { id: 'seed', title: 'Seed Deck Outline — Pitch + Notion', to: '/session/seed-deck' },
  // { id: 'f1', title: 'Figma design roadmap' },
  // { id: 'f2', title: 'Figma design roadmap' },
  // { id: 'f3', title: 'Figma design roadmap' },
  // { id: 'f4', title: 'Figma design roadmap' },
];
