import { ArrowRight, Award, CheckCircle2, RefreshCw, XCircle } from 'lucide-react';
import { CATEGORY_LABELS, type CategoryFilter, type QuestionItem } from '../types/grammar';

interface QuizWorkspaceProps {
  filter: CategoryFilter;
  filteredTotal: number;
  unansweredCount: number;
  currentQuestion: QuestionItem | null;
  optionsOrder: string[];
  chosenOption: string | null;
  onSelectOption: (option: string) => void;
  onNextQuestion: () => void;
  onResetCategory: () => void;
}

export function QuizWorkspace({
  filter,
  filteredTotal,
  unansweredCount,
  currentQuestion,
  optionsOrder,
  chosenOption,
  onSelectOption,
  onNextQuestion,
  onResetCategory,
}: QuizWorkspaceProps) {
  const doneInFilter = filteredTotal - unansweredCount;
  const pct = filteredTotal > 0 ? Math.round((doneInFilter / filteredTotal) * 100) : 0;
  const hasAnswered = chosenOption !== null;
  const isCorrect = hasAnswered && currentQuestion !== null && chosenOption === currentQuestion.answer;

  const renderPrompt = (q: QuestionItem) => {
    const parts = q.prompt.split('_____');
    if (parts.length !== 2) {
      return <span>{q.prompt}</span>;
    }

    let slotClass = 'border-[#2d6a45] text-[#2d6a45]';
    if (hasAnswered) {
      slotClass = isCorrect
        ? 'border-[#2d6a45] text-[#2d6a45]'
        : 'border-[#b4322f] text-[#b4322f]';
    }

    return (
      <>
        <span>{parts[0]}</span>
        <span
          className={`inline-block min-w-[5.5rem] px-2 mx-1 border-b-2 font-bold text-center ${slotClass}`}
        >
          {hasAnswered ? q.answer : '_____'}
        </span>
        <span>{parts[1]}</span>
      </>
    );
  };

  return (
    <section
      className="bg-white border border-[#c4d0bf]/85 rounded-2xl p-6 sm:p-10 shadow-[0_4px_20px_rgb(31_43_34_/_0.06)] flex flex-col gap-6"
      aria-label="Interactive Grammar Quiz"
    >
      {/* Progress Strip */}
      <div className="bg-[#ecf1e8] rounded-xl px-4 py-2.5 flex items-center justify-between gap-4 flex-wrap">
        <span className="font-mono text-xs text-[#4e6152] tabular-nums">
          {doneInFilter.toLocaleString('en-GB')} of {filteredTotal.toLocaleString('en-GB')} answered
          <span aria-hidden="true"> · </span>
          {unansweredCount.toLocaleString('en-GB')} unseen
        </span>
        <div
          className="flex-1 min-w-[160px] h-2.5 bg-[#d3decc] rounded-full overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="h-full bg-[#2d6a45] rounded-full transition-[width] duration-200 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="font-mono text-xs text-[#4e6152] tabular-nums">{pct}% complete</span>
      </div>

      {currentQuestion ? (
        <div>
          {/* Unboxed clean metadata header */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 text-xs font-mono">
            <div className="flex items-center gap-2 text-[#174328] font-semibold">
              <span>{CATEGORY_LABELS[currentQuestion.cat]}</span>
              <span aria-hidden="true" className="text-[#6c7c6f]">·</span>
              <span className="text-[#4e6152] font-normal">{currentQuestion.rule}</span>
            </div>
            <span className="text-[#4e6152] tabular-nums">
              #{String(currentQuestion.id).padStart(4, '0')}
            </span>
          </div>

          {/* Question Box — clean surface contrast & hairline border, no thick left accent stripe */}
          <div className="bg-[#ecf1e8] border border-[#c4d0bf]/80 rounded-2xl px-6 py-6 sm:px-8 sm:py-7 mb-6">
            <p className="font-[var(--font-headline)] text-xl sm:text-2xl font-medium leading-relaxed text-[#1f2b22] m-0">
              {renderPrompt(currentQuestion)}
            </p>
          </div>

          {/* 2x2 Options Grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            role="group"
            aria-label="Answer choices"
          >
            {optionsOrder.map((optText, i) => {
              const isAnswer = optText === currentQuestion.answer;
              const isChosen = optText === chosenOption;

              let btnStyle =
                'bg-white text-[#1f2b22] border border-[#c4d0bf]/85 hover:bg-[#ecf1e8] hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgb(31_43_34_/_0.06)]';
              let keyStyle = 'bg-[#e0e8da] text-[#465649]';

              if (hasAnswered) {
                if (isAnswer) {
                  btnStyle =
                    'bg-[#d8efe0] text-[#174328] border border-[#2d6a45] ring-2 ring-[#2d6a45]';
                  keyStyle = 'bg-[#2d6a45] text-white';
                } else if (isChosen && !isCorrect) {
                  btnStyle =
                    'bg-[#fbe8e7] text-[#b4322f] border border-[#b4322f] ring-2 ring-[#b4322f]';
                  keyStyle = 'bg-[#b4322f] text-white';
                } else {
                  btnStyle =
                    'bg-white/70 text-[#465649] border border-[#c4d0bf]/60 opacity-75';
                }
              }

              return (
                <button
                  key={`${currentQuestion.id}-${optText}-${i}`}
                  type="button"
                  disabled={hasAnswered}
                  onClick={() => onSelectOption(optText)}
                  className={`min-h-[54px] px-5 py-3.5 rounded-xl font-semibold text-[1.0625rem] text-left flex items-center justify-between gap-3 transition-all duration-150 ease-out disabled:cursor-default ${btnStyle}`}
                >
                  <span
                    className={`font-mono text-[13px] w-7 h-7 rounded-md inline-flex items-center justify-center shrink-0 tabular-nums ${keyStyle}`}
                  >
                    {i + 1}
                  </span>
                  <span className="flex-1">{optText}</span>
                  {hasAnswered && isAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-[#2d6a45] shrink-0" aria-hidden="true" />
                  )}
                  {hasAnswered && isChosen && !isAnswer && (
                    <XCircle className="w-5 h-5 text-[#b4322f] shrink-0" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback Banner */}
          {hasAnswered && (
            <div
              aria-live="polite"
              className={`mt-6 rounded-2xl px-6 py-5 flex flex-col gap-2 animate-fade-up ${
                isCorrect
                  ? 'bg-[#d8efe0] text-[#174328]'
                  : 'bg-[#fbe8e7] text-[#b4322f]'
              }`}
            >
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <span className="font-mono text-[13px] font-bold tracking-wider inline-flex items-center gap-1.5">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Correct</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Incorrect — Answer: {currentQuestion.answer}</span>
                    </>
                  )}
                </span>
                <span className="font-mono text-xs text-[#4e6152]">
                  {currentQuestion.rule}
                </span>
              </div>
              <p className="italic text-[#1f2b22] m-0">“{currentQuestion.en}”</p>
              <p className="text-[#1f2b22] text-[0.9375rem] leading-relaxed m-0">
                {currentQuestion.why}
              </p>
            </div>
          )}

          {/* Quiz Controls */}
          <div className="mt-6 pt-4 border-t border-[#c4d0bf]/85 flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono text-xs text-[#4e6152]">
              Shortcuts: keys 1–4 to answer, Enter for next
            </span>
            <button
              type="button"
              disabled={!hasAnswered}
              onClick={onNextQuestion}
              className="min-h-[44px] px-5 py-2.5 rounded-xl text-[0.9375rem] font-bold inline-flex items-center gap-2 bg-[#2d6a45] text-white hover:bg-[#235537] disabled:opacity-45 disabled:cursor-not-allowed transition-colors duration-150 whitespace-nowrap shrink-0"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-[#d8efe0] text-[#174328] rounded-2xl p-8 text-center flex flex-col items-center gap-4">
          <Award className="w-9 h-9" aria-hidden="true" />
          <h2 className="font-[var(--font-headline)] text-2xl font-semibold m-0">
            {CATEGORY_LABELS[filter]} Complete
          </h2>
          <p className="m-0 max-w-md text-[#174328]/90">
            You have answered every unique question in {CATEGORY_LABELS[filter]} with zero
            repetitions.
          </p>
          <button
            type="button"
            onClick={onResetCategory}
            className="min-h-[44px] px-5 py-2.5 rounded-xl text-[0.9375rem] font-bold inline-flex items-center gap-2 bg-[#2d6a45] text-white hover:bg-[#235537] transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
            <span>Practise This Category Again</span>
          </button>
        </div>
      )}
    </section>
  );
}
