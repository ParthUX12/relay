import { useState, type RefObject } from 'react';

const modes = ['Auto Orchestrate', 'Manual Steps'];

type Props = {
  generating: boolean;
  onSend: () => void;
  onStop: () => void;
  textareaRef: RefObject<HTMLTextAreaElement>;
};

export default function Composer({ generating, onSend, onStop, textareaRef }: Props) {
  const [prompt, setPrompt] = useState('');
  const [modeOpen, setModeOpen] = useState(false);
  const [mode, setMode] = useState(modes[0]);
  const [listening, setListening] = useState(false);

  const submit = () => {
    if (!generating) return;
    onSend();
  };

  return (
    <div className="shrink-0 rounded-md border border-grey-20 bg-grey-10 p-2 shadow-color transition focus-within:border-primary">
      <textarea
        ref={textareaRef}
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            submit();
          }
        }}
        placeholder="Ask me anything..."
        aria-label="Ask me anything"
        rows={2}
        className="min-h-[68px] w-full resize-none bg-transparent px-2 pt-2 text-body text-grey-90 outline-none placeholder:text-grey-65"
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
                {modes.map((option) => (
                  <button key={option} type="button" onClick={() => { setMode(option); setModeOpen(false); }} className="block w-full rounded-sm px-3 py-2 text-left text-button text-grey-80 hover:bg-primary-bg">
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button type="button" aria-label="Use microphone" onClick={() => setListening((active) => !active)} className={`flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-primary-bg ${listening ? 'bg-primary-bg' : ''}`}>
            <img src="/assets/icons/mic.svg" alt="" className="h-6 w-6" />
          </button>
          <button type="button" aria-label={generating ? 'Stop generation' : 'Send prompt'} onClick={generating ? onStop : undefined} disabled={!generating} className={`flex h-10 w-10 items-center justify-center rounded-full transition ${generating ? 'bg-primary-bg text-alert-red hover:opacity-90 active:scale-95' : 'cursor-default bg-primary-bg'}`}>
            <img src={generating ? '/assets/icons/stop.svg' : '/assets/icons/send.svg'} alt="" className={`h-6 w-6 ${generating ? '' : 'opacity-50'}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
