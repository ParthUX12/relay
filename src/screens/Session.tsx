import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2, MoreVertical } from 'lucide-react';
import Button from '../components/ui/Button';
import Composer from '../components/session/Composer';
import PlanTable from '../components/session/PlanTable';
import FlowCanvas from '../components/canvas/FlowCanvas';
import { chat } from '../data/session';

const TIMINGS = {
  user: 0,
  thinkingStart: 200,
  thinkingDuration: 100,
  word: 30,
  tableRow: 250,
  canvasReveal: 500,
};

type Phase = 'user' | 'thinking' | 'intro' | 'plan' | 'table' | 'closing' | 'complete';

const wait = (duration: number) => new Promise<void>((resolve) => window.setTimeout(resolve, duration));

export default function Session() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('user');
  const [userVisible, setUserVisible] = useState(false);
  const [introVisible, setIntroVisible] = useState(0);
  const [planVisible, setPlanVisible] = useState(false);
  const [summaryVisible, setSummaryVisible] = useState(false);
  const [visibleRows, setVisibleRows] = useState(0);
  const [closingVisible, setClosingVisible] = useState(0);
  const [estimateVisible, setEstimateVisible] = useState(false);
  const [actionsVisible, setActionsVisible] = useState(false);
  const [revealed, setRevealed] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [generating, setGenerating] = useState(true);
  const messageRef = useRef<HTMLDivElement>(null);
  const composerRef = useRef<HTMLTextAreaElement>(null);
  const runId = useRef(0);
  const introWords = chat.intro.split(' ');
  const closingWords = chat.closing.split(' ');

  const finishImmediately = () => {
    runId.current += 1;
    setPhase('complete');
    setUserVisible(true);
    setIntroVisible(introWords.length);
    setPlanVisible(true);
    setSummaryVisible(true);
    setVisibleRows(chat.planRows.length);
    setClosingVisible(closingWords.length);
    setEstimateVisible(true);
    setActionsVisible(true);
    setRevealed(6);
    setGenerating(false);
  };

  useEffect(() => {
    const currentRun = ++runId.current;
    const run = async () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) {
        finishImmediately();
        return;
      }
      setPhase('user');
      await wait(TIMINGS.user);
      if (currentRun !== runId.current) return;
      setUserVisible(true);
      await wait(TIMINGS.thinkingStart);
      if (currentRun !== runId.current) return;
      setPhase('thinking');
      await wait(TIMINGS.thinkingDuration);
      if (currentRun !== runId.current) return;
      setPhase('intro');
      for (let index = 0; index < introWords.length; index += 1) {
        setIntroVisible(index + 1);
        await wait(TIMINGS.word);
        if (currentRun !== runId.current) return;
      }
      setPhase('plan');
      setPlanVisible(true);
      setSummaryVisible(true);
      await wait(TIMINGS.word * 2);
      setPhase('table');
      await wait(TIMINGS.tableRow);
      setVisibleRows(chat.planRows.length);
      for (let index = 0; index < chat.planRows.length; index += 1) {
        setRevealed(index + 1);
        await wait(TIMINGS.canvasReveal);
        if (currentRun !== runId.current) return;
      }
      setPhase('closing');
      for (let index = 0; index < closingWords.length; index += 1) {
        setClosingVisible(index + 1);
        await wait(TIMINGS.word);
        if (currentRun !== runId.current) return;
      }
      setEstimateVisible(true);
      await wait(TIMINGS.word * 2);
      setActionsVisible(true);
      setPhase('complete');
      setGenerating(false);
    };
    run();
    return () => { runId.current += 1; };
  }, []);

  useEffect(() => {
    const messageArea = messageRef.current;
    if (!messageArea) return;
    messageArea.scrollTo({ top: messageArea.scrollHeight, behavior: 'smooth' });
  }, [introVisible, planVisible, summaryVisible, visibleRows, closingVisible, estimateVisible, actionsVisible]);

  const stream = (words: string[], visible: number) => words.map((word, index) => (
    <span key={`${word}-${index}`} className={`transition-opacity duration-300 ${index < visible ? 'opacity-100' : 'opacity-0'}`}>{word}{index < words.length - 1 ? ' ' : ''}</span>
  ));

  return (
    <main className="min-h-full bg-grey-10 p-2 md:p-1">
      {/* <section className="min-h-[calc(100vh-24px)] overflow-hidden rounded-[20px] bg-grey-10 border border-grey-20 shadow-1 md:p-2"> */}
      <section className=" min-h-[calc(100vh-16px)] overflow-hidden rounded-[20px] border border-grey-20 bg-white shadow-1 m-1 ml-2 md:p-2">
        <div className={`grid h-[calc(100vh-32px)] gap-4 ${expanded ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
          {!expanded && (
            <section className="flex min-h-0 flex-col overflow-hidden rounded-[10px] bg-white p-2 md:p-1">
              <header className="flex shrink-0 items-center justify-between px-1 pb-3 gap-3">
                <h1 className="type-title-text text-body-bold text-grey-90">{chat.title}</h1>
                <div className="flex items-center gap-3 text-grey-90">
                  <button type="button" aria-label="Share session" className="transition hover:text-primary"><Share2 size={18} /></button>
                  <button type="button" aria-label="More session options" className="transition hover:text-primary"><MoreVertical size={18} /></button>
                </div>
              </header>
              <div ref={messageRef} className="min-h-0 flex-1 overflow-y-auto px-1 py-6">
                <div className={`ml-auto max-w-[86%] rounded-lg bg-grey-20 px-3 py-2 transition duration-300 ${userVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`} style={{ transitionDuration: '250ms' }}>
                  <p className="type-body-text text-grey-90">{chat.userMessage}</p>
                </div>
                {phase === 'thinking' && <div className="mt-6 h-2 w-2 animate-pulse rounded-full bg-primary" />}
                {introVisible > 0 && <p className="type-body-text mt-6 text-grey-90">{stream(introWords, introVisible)}</p>}
                {planVisible && <p className="screen-in type-body-text mt-5 text-grey-90">{chat.planLead}</p>}
                {summaryVisible && <p className="screen-in type-body-bold text-body-bold mt-1 text-grey-90">{chat.planSummary}</p>}
                {planVisible && <div className="mt-2"><PlanTable rows={chat.planRows} visibleRows={visibleRows} /></div>}
                {closingVisible > 0 && <p className="type-body-text mt-4 text-small text-grey-90">{stream(closingWords, closingVisible)}</p>}
                {estimateVisible && <p className="screen-in type-code-small text-caption mt-2 text-grey-80">{chat.estimate}</p>}
                {actionsVisible && !accepted && (
                  <div className="screen-in mt-4 flex flex-wrap gap-2">
                    <Button type="button" onClick={() => setAccepted(true)} className="h-8 rounded-full px-4">Accept Plan</Button>
                    <Button type="button" variant="secondary" onClick={() => composerRef.current?.focus()} className="h-8 rounded-full border border-primary px-4">Adjust Steps</Button>
                    <Button type="button" variant="secondary" onClick={() => navigate('/')} className="h-8 rounded-full border border-primary px-4">Cancel</Button>
                  </div>
                )}
                {accepted && <p className="type-body-bold mt-4 flex items-center gap-2 text-alert-green"><img src="/assets/icons/tick.svg" alt="" className="h-5 w-5" />Plan accepted. You will be notified of the progress.</p>}
              </div>
              <Composer generating={generating} onSend={() => undefined} onStop={finishImmediately} textareaRef={composerRef} />
            </section>
          )}
          <section className="min-h-0 overflow-hidden border border-grey-20 rounded-[16px] bg-grey-10 shadow-1">
            <FlowCanvas revealed={revealed} expanded={expanded} onToggleExpand={() => setExpanded((value) => !value)} />
          </section>
        </div>
      </section>
    </main>
  );
}
