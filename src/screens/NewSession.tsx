import { useState } from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { user, workflowTemplates, type WorkflowTemplate } from '../data/mock';

function ServiceIcons({ icons }: { icons: string[] }) {
  return (
    <div className="flex items-center -space-x-1">
      {icons.map((icon, index) => (
        <img
          key={`${icon}-${index}`}
          src={`/assets/icons/${icon}`}
          alt=""
          className="relative h-9 w-9 rounded-md"
        />
      ))}
    </div>
  );
}

function TemplateCard({ template, onSelect }: { template: WorkflowTemplate; onSelect: () => void }) {
  return (
    <button type="button" onClick={onSelect} className="block w-full text-left">
      <Card className="h-full shadow-1 border border-grey-20 p-2 transition hover:shadow-color">
        <div className="flex items-start justify-between gap-3">
          <ServiceIcons icons={template.icons} />
          <span className="rounded-full bg-primary-bg px-3 py-1 text-small text-grey-65">
            {template.services}
          </span>
        </div>
        <h3 className="text-body-bold mt-2 text-grey-90">{template.title}</h3>
        <p className="text-small mt-1 leading-[15px] text-grey-65">{template.description}</p>
        <div className="mt-2 flex items-center gap-2 text-code-small text-grey-80">
          <img src="/assets/icons/time.svg" alt="" className="h-4 w-4" />
          {template.estimate}
        </div>
      </Card>
    </button>
  );
}

export default function NewSession() {
  const [prompt, setPrompt] = useState('');
  const [modeOpen, setModeOpen] = useState(false);
  const [mode, setMode] = useState('Auto Orchestrate');
  const [listening, setListening] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const selectTemplate = (template: WorkflowTemplate) => {
    setPrompt(template.title);
    setSubmitted(false);
  };

  const submitPrompt = () => {
    if (!prompt.trim()) return;
    setSubmitted(true);
  };

  return (
    <main className="min-h-full bg-grey-10 p-2 md:p-3">
      <section className="relative min-h-[calc(100vh-24px)] overflow-hidden rounded-lg bg-white px-4 pb-8 pt-20 shadow-1 md:px-8 md:pb-12 md:pt-32">
        <div className="absolute right-4 top-4 flex items-center gap-2">
          <button type="button" aria-label="Expand session" className="flex h-9 w-9 items-center justify-center rounded-full border border-grey-35 text-grey-80 transition hover:border-primary hover:text-primary">
            <img src="/assets/icons/incognito.svg" alt="" className="h-5 w-5" />
          </button>
          <button type="button" aria-label="More options" className="flex h-9 w-9 items-center justify-center rounded-full border border-grey-35 text-title text-grey-80 transition hover:border-primary hover:text-primary">
            <img src="/assets/icons/menu.svg" alt="" className="h-5 w-5" />
          </button>
        </div>

        <div className="mx-auto max-w-[860px]">
          <header className="text-center">
            <h1 className="text-h1 text-primary md:text-display">Welcome back, {user.name}!</h1>
            <p className="text-body mt-1 text-grey-65">What’s on your mind today?</p>
          </header>

          <div className="relative mx-auto mt-9 max-w-[580px] rounded-md border border-grey-20 bg-grey-10 p-2 shadow-color transition focus-within:border-primary">
            <textarea
              value={prompt}
              onChange={(event) => { setPrompt(event.target.value); setSubmitted(false); }}
              placeholder="Ask me anything..."
              aria-label="Ask me anything"
              rows={2}
              className="min-h-[68px] w-full resize-none bg-transparent pr-2 pl-2 pt-2 text-body text-grey-90 outline-none placeholder:text-grey-65"
            />
            <div className="flex items-center justify-between">
              <button type="button" aria-label="Add attachment" className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-primary-bg">
                <img src="/assets/icons/add.svg" alt="" className="h-6 w-6" />
              </button>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <button type="button" onClick={() => setModeOpen((open) => !open)} className="flex items-center gap-2 text-button text-grey-90 transition hover:text-primary">
                    {mode}
                    <img src="/assets/icons/down.svg" alt="" className="h-4 w-4" />
                  </button>
                  {modeOpen && (
                    <div className="absolute bottom-9 right-0 z-10 min-w-[170px] rounded-full border border-grey-35 bg-white p-1 shadow-1">
                      {['Auto Orchestrate', 'Manual Steps'].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => { setMode(option); setModeOpen(false); }}
                          className="block w-full rounded-sm px-3 py-2 text-left text-button text-grey-80 hover:bg-primary-bg"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button type="button" aria-label="Use microphone" onClick={() => setListening((active) => !active)} className={`flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-primary-bg ${listening ? 'bg-primary-bg' : ''}`}>
                  <img src="/assets/icons/mic.svg" alt="" className="h-6 w-6" />
                </button>
                <button type="button" aria-label="Send prompt" onClick={submitPrompt} className="flex h-8 w-8 items-center justify-center rounded-full bg-primary transition hover:opacity-90 active:scale-95">
                  <img src="/assets/icons/send.svg" alt="" className="h-6 w-6 brightness-0 invert" />
                </button>
              </div>
            </div>
            {submitted && <p className="text-small mt-2 text-alert-green">Your session prompt is ready to run.</p>}
          </div>

          <div className="mt-20">
            <div className="mb-3 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-h2 text-grey-90">Workflow Templates</h2>
                <p className="text-small mt-1 text-grey-65">These are a few popular autonomous multi-agent workflows people use.</p>
              </div>
              <Button variant="ghost" className="h-8 shrink-0 rounded-full border border-primary px-4 text-small">
                View all templates
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {workflowTemplates.map((template) => (
                <TemplateCard key={template.title} template={template} onSelect={() => selectTemplate(template)} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
