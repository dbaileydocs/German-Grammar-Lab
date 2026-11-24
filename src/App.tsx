import { RotateCcw } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MetricsStrip } from './components/MetricsStrip';
import { QuizWorkspace } from './components/QuizWorkspace';
import { ReferenceGuide } from './components/ReferenceGuide';
import { buildQuestionPool } from './data/questionPool';
import {
  CATEGORY_LABELS,
  type AppState,
  type CategoryFilter,
  type CategoryKey,
  type QuestionItem,
} from './types/grammar';

const STORAGE_KEY = 'german_structure_lab_state_v1';

const DEFAULT_STATE: AppState = {
  filter: 'all',
  answeredIds: [],
  correctCount: 0,
  totalAnswered: 0,
  streak: 0,
  bestStreak: 0,
  activeRefTab: 'prepositions',
};

function shuffleArray<T>(arr: T[]): T[] {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = copy[i];
    copy[i] = copy[j];
    copy[j] = tmp;
  }
  return copy;
}

function loadSavedState(): AppState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const saved = JSON.parse(raw) as Partial<AppState>;
    const validFilter: CategoryFilter =
      saved.filter && saved.filter in CATEGORY_LABELS ? saved.filter : 'all';
    const validTab: CategoryKey =
      saved.activeRefTab === 'prepositions' ||
      saved.activeRefTab === 'separable' ||
      saved.activeRefTab === 'conjunctions'
        ? saved.activeRefTab
        : 'prepositions';

    return {
      filter: validFilter,
      answeredIds: Array.isArray(saved.answeredIds)
        ? saved.answeredIds.filter((id): id is number => typeof id === 'number')
        : [],
      correctCount: typeof saved.correctCount === 'number' ? saved.correctCount : 0,
      totalAnswered: typeof saved.totalAnswered === 'number' ? saved.totalAnswered : 0,
      streak: typeof saved.streak === 'number' ? saved.streak : 0,
      bestStreak: typeof saved.bestStreak === 'number' ? saved.bestStreak : 0,
      activeRefTab: validTab,
    };
  } catch {
    return DEFAULT_STATE;
  }
}

export default function App() {
  const questionPool = useMemo(() => buildQuestionPool(), []);
  const [appState, setAppState] = useState<AppState>(() => loadSavedState());
  const [currentQuestion, setCurrentQuestion] = useState<QuestionItem | null>(null);
  const [optionsOrder, setOptionsOrder] = useState<string[]>([]);
  const [chosenOption, setChosenOption] = useState<string | null>(null);
  const [resetArmed, setResetArmed] = useState(false);
  const disarmTimerRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    } catch {
      // Ignore storage quota or private browsing errors
    }
  }, [appState]);

  const pickNextQuestion = useCallback(
    (filter: CategoryFilter, answeredIds: number[]) => {
      const answeredSet = new Set(answeredIds);
      const filtered =
        filter === 'all'
          ? questionPool
          : questionPool.filter((q) => q.cat === filter);
      const unseen = filtered.filter((q) => !answeredSet.has(q.id));

      if (unseen.length === 0) {
        setCurrentQuestion(null);
        setOptionsOrder([]);
        setChosenOption(null);
        return;
      }

      const nextQ = unseen[Math.floor(Math.random() * unseen.length)];
      setCurrentQuestion(nextQ);
      setOptionsOrder(shuffleArray(nextQ.options));
      setChosenOption(null);
    },
    [questionPool],
  );

  // Initial question selection on mount
  useEffect(() => {
    pickNextQuestion(appState.filter, appState.answeredIds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredPool = useMemo(() => {
    if (appState.filter === 'all') return questionPool;
    return questionPool.filter((q) => q.cat === appState.filter);
  }, [appState.filter, questionPool]);

  const answeredSet = useMemo(() => new Set(appState.answeredIds), [appState.answeredIds]);

  const unansweredInFilter = useMemo(
    () => filteredPool.filter((q) => !answeredSet.has(q.id)).length,
    [filteredPool, answeredSet],
  );

  const categoryCounts = useMemo(() => {
    let all = 0;
    let prepositions = 0;
    let separable = 0;
    let conjunctions = 0;
    for (const q of questionPool) {
      if (!answeredSet.has(q.id)) {
        all += 1;
        if (q.cat === 'prepositions') prepositions += 1;
        else if (q.cat === 'separable') separable += 1;
        else if (q.cat === 'conjunctions') conjunctions += 1;
      }
    }
    return { all, prepositions, separable, conjunctions };
  }, [questionPool, answeredSet]);

  const handleSelectOption = useCallback(
    (opt: string) => {
      if (chosenOption !== null || !currentQuestion) return;
      setChosenOption(opt);

      const isCorrect = opt === currentQuestion.answer;
      setAppState((prev) => {
        const nextAnsweredIds = prev.answeredIds.includes(currentQuestion.id)
          ? prev.answeredIds
          : [...prev.answeredIds, currentQuestion.id];
        const nextStreak = isCorrect ? prev.streak + 1 : 0;
        const nextBest = Math.max(prev.bestStreak, nextStreak);

        return {
          ...prev,
          answeredIds: nextAnsweredIds,
          totalAnswered: prev.totalAnswered + 1,
          correctCount: prev.correctCount + (isCorrect ? 1 : 0),
          streak: nextStreak,
          bestStreak: nextBest,
        };
      });
    },
    [chosenOption, currentQuestion],
  );

  const handleNextQuestion = useCallback(() => {
    pickNextQuestion(appState.filter, appState.answeredIds);
  }, [appState.filter, appState.answeredIds, pickNextQuestion]);

  const handleSetFilter = (nextFilter: CategoryFilter) => {
    setAppState((prev) => ({ ...prev, filter: nextFilter }));
    pickNextQuestion(nextFilter, appState.answeredIds);
  };

  const handleResetSession = () => {
    if (!resetArmed) {
      setResetArmed(true);
      if (disarmTimerRef.current !== null) {
        window.clearTimeout(disarmTimerRef.current);
      }
      disarmTimerRef.current = window.setTimeout(() => {
        setResetArmed(false);
        disarmTimerRef.current = null;
      }, 3500);
      return;
    }

    if (disarmTimerRef.current !== null) {
      window.clearTimeout(disarmTimerRef.current);
      disarmTimerRef.current = null;
    }
    setResetArmed(false);
    setAppState((prev) => ({
      ...DEFAULT_STATE,
      activeRefTab: prev.activeRefTab,
    }));
    pickNextQuestion('all', []);
  };

  const handleResetCategory = () => {
    const catIds = new Set(filteredPool.map((q) => q.id));
    const nextAnsweredIds = appState.answeredIds.filter((id) => !catIds.has(id));
    setAppState((prev) => ({ ...prev, answeredIds: nextAnsweredIds }));
    pickNextQuestion(appState.filter, nextAnsweredIds);
  };

  const handleSelectRefTab = (tab: CategoryKey) => {
    setAppState((prev) => ({ ...prev, activeRefTab: tab }));
  };

  // Keyboard shortcuts: 1-4 to pick options, Enter for Next Question
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }
      if (chosenOption === null && ['1', '2', '3', '4'].includes(e.key)) {
        const idx = Number(e.key) - 1;
        if (optionsOrder[idx]) {
          e.preventDefault();
          handleSelectOption(optionsOrder[idx]);
        }
      } else if (chosenOption !== null && e.key === 'Enter') {
        e.preventDefault();
        handleNextQuestion();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [chosenOption, optionsOrder, handleSelectOption, handleNextQuestion]);

  const filterButtons: { key: CategoryFilter; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: categoryCounts.all },
    { key: 'prepositions', label: 'Prepositions & Contractions', count: categoryCounts.prepositions },
    { key: 'separable', label: 'Separable Verbs', count: categoryCounts.separable },
    { key: 'conjunctions', label: 'Conjunctions & Word Order', count: categoryCounts.conjunctions },
  ];

  return (
    <div className="max-w-[1120px] mx-auto px-4 sm:px-6 pt-6 pb-16 flex flex-col gap-10">
      <header className="flex flex-col gap-5 border-b border-[#c4d0bf]/85 pb-6">
        <div className="flex flex-wrap justify-between items-end gap-4">
          <div>
            <p className="font-mono text-xs font-semibold tracking-wider text-[#8c561e] mb-1">
              Deutsche Grammatik · Level A1–B1
            </p>
            <h1 className="font-[var(--font-headline)] text-3xl sm:text-4xl font-semibold tracking-tight leading-tight text-[#1f2b22] m-0 text-balance">
              German Structure Lab
            </h1>
            <p className="mt-1.5 text-[#465649] max-w-[64ch] m-0">
              Targeted multiple-choice practice across 1,000 realistic sentences covering
              prepositions and contractions, separable verbs, and clause word order—paired with a
              complete structural reference guide.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleResetSession}
              className="min-h-[44px] px-4 py-2 rounded-xl text-[0.9375rem] font-bold inline-flex items-center gap-2 bg-[#e0e8da] text-[#1f2b22] hover:bg-[#d3decc] transition-colors duration-150 whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>{resetArmed ? 'Confirm Reset?' : 'Reset Session'}</span>
            </button>
          </div>
        </div>

        <MetricsStrip
          unansweredCount={unansweredInFilter}
          filteredTotal={filteredPool.length}
          filter={appState.filter}
          totalAnswered={appState.totalAnswered}
          correctCount={appState.correctCount}
          streak={appState.streak}
          bestStreak={appState.bestStreak}
        />

        <nav className="flex flex-wrap items-center gap-2" aria-label="Question category filter">
          {filterButtons.map((btn) => {
            const isActive = appState.filter === btn.key;
            return (
              <button
                key={btn.key}
                type="button"
                onClick={() => handleSetFilter(btn.key)}
                className={`min-h-[44px] px-4 py-2 rounded-xl border text-[0.9375rem] font-semibold inline-flex items-center gap-2 transition-colors duration-150 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#2d6a45] text-white border-[#2d6a45] shadow-[0_4px_20px_rgb(31_43_34_/_0.06)]'
                    : 'bg-white text-[#1f2b22] border-[#c4d0bf]/85 hover:bg-[#ecf1e8]'
                }`}
              >
                <span>{btn.label}</span>
                <span
                  className={`font-mono text-xs tabular-nums ${
                    isActive ? 'text-white/85' : 'text-[#465649]'
                  }`}
                >
                  {btn.count.toLocaleString('en-GB')}
                </span>
              </button>
            );
          })}
        </nav>
      </header>

      <main className="flex flex-col gap-10">
        <QuizWorkspace
          filter={appState.filter}
          filteredTotal={filteredPool.length}
          unansweredCount={unansweredInFilter}
          currentQuestion={currentQuestion}
          optionsOrder={optionsOrder}
          chosenOption={chosenOption}
          onSelectOption={handleSelectOption}
          onNextQuestion={handleNextQuestion}
          onResetCategory={handleResetCategory}
        />

        <ReferenceGuide activeTab={appState.activeRefTab} onSelectTab={handleSelectRefTab} />

        <footer className="text-[#465649] text-sm border-t border-[#c4d0bf]/85 pt-4">
          Grounded in standard German A1–B1 grammar references (
          <em>Basic German: A Grammar and Workbook</em>, <em>Schritte plus 2</em>,{' '}
          <em>Schritte Übungsgrammatik</em>, and <em>Easy Learning German Verbs</em>). Progress
          saves automatically in your browser.
        </footer>
      </main>
    </div>
  );
}
