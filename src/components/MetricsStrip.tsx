import { CATEGORY_LABELS, type CategoryFilter } from '../types/grammar';

interface MetricsStripProps {
  unansweredCount: number;
  filteredTotal: number;
  filter: CategoryFilter;
  totalAnswered: number;
  correctCount: number;
  streak: number;
  bestStreak: number;
}

export function MetricsStrip({
  unansweredCount,
  filteredTotal,
  filter,
  totalAnswered,
  correctCount,
  streak,
  bestStreak,
}: MetricsStripProps) {
  const accuracy =
    totalAnswered > 0 ? `${Math.round((correctCount / totalAnswered) * 100)}%` : '—';

  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
      aria-label="Session statistics"
    >
      <div className="bg-[#d8efe0] text-[#174328] rounded-2xl px-5 py-4 flex flex-col gap-1">
        <span className="font-mono text-xs font-semibold tracking-wider text-[#174328]">
          Pool Remaining
        </span>
        <span className="font-[var(--font-headline)] text-2xl sm:text-3xl font-semibold leading-tight tabular-nums">
          {unansweredCount.toLocaleString('en-GB')}
        </span>
        <span className="text-[13px] text-[#174328]/85">
          of {filteredTotal.toLocaleString('en-GB')} in {CATEGORY_LABELS[filter]}
        </span>
      </div>

      <div className="bg-[#ecf1e8] rounded-2xl px-5 py-4 flex flex-col gap-1">
        <span className="font-mono text-xs font-semibold tracking-wider text-[#4e6152]">
          Answered
        </span>
        <span className="font-[var(--font-headline)] text-2xl sm:text-3xl font-semibold leading-tight tabular-nums text-[#1f2b22]">
          {totalAnswered.toLocaleString('en-GB')}
        </span>
        <span className="text-[13px] text-[#465649] tabular-nums">
          {correctCount.toLocaleString('en-GB')} correct
        </span>
      </div>

      <div className="bg-[#ecf1e8] rounded-2xl px-5 py-4 flex flex-col gap-1">
        <span className="font-mono text-xs font-semibold tracking-wider text-[#4e6152]">
          Accuracy
        </span>
        <span className="font-[var(--font-headline)] text-2xl sm:text-3xl font-semibold leading-tight tabular-nums text-[#1f2b22]">
          {accuracy}
        </span>
        <span className="text-[13px] text-[#465649]">Session precision</span>
      </div>

      <div className="bg-[#ecf1e8] rounded-2xl px-5 py-4 flex flex-col gap-1">
        <span className="font-mono text-xs font-semibold tracking-wider text-[#4e6152]">
          Current Streak
        </span>
        <span className="font-[var(--font-headline)] text-2xl sm:text-3xl font-semibold leading-tight tabular-nums text-[#1f2b22]">
          {streak}
        </span>
        <span className="text-[13px] text-[#465649] tabular-nums">
          Best: {bestStreak}
        </span>
      </div>
    </div>
  );
}
