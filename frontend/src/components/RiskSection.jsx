function RiskSection({ riskFactors }) {
  const hasRisks = riskFactors.length > 0

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-[#3a3a42] bg-gradient-to-b from-[#2a2a30]/95 to-[#1f1f23]/95 p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${
          hasRisks ? 'via-[#c97370]/40' : 'via-[#9FD8C9]/40'
        }`}
      />
      <div className="flex items-center gap-2">
        {hasRisks ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5 text-[#c97370]"
            aria-hidden="true"
          >
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5 text-[#9FD8C9]"
            aria-hidden="true"
          >
            <path d="M9 12l2 2 4-4" />
            <circle cx="12" cy="12" r="10" />
          </svg>
        )}
        <p
          className={`text-[11px] font-semibold tracking-[0.24em] uppercase ${
            hasRisks ? 'text-[#c97370]' : 'text-[#9FD8C9]'
          }`}
        >
          Risk Signals
        </p>
      </div>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#ececf1] sm:text-3xl">
        {hasRisks ? 'Things that gave us pause' : 'All clear — no red flags'}
      </h2>

      <div className="mt-5 space-y-3">
        {hasRisks ? (
          riskFactors.map((risk) => (
            <div
              key={risk}
              className="flex items-start gap-3 rounded-2xl border border-[#3a2525] bg-[#241818] px-4 py-3 text-[13px] leading-7 text-[#e0b0ae]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-1 h-4 w-4 shrink-0 text-[#c97370]"
                aria-hidden="true"
              >
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
              </svg>
              <span>{risk}</span>
            </div>
          ))
        ) : (
          <div className="flex items-start gap-3 rounded-2xl border border-[#2a3a30] bg-[#182420] px-4 py-3 text-[13px] leading-7 text-[#9FD8C9]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-1 h-4 w-4 shrink-0 text-[#9FD8C9]"
              aria-hidden="true"
            >
              <path d="M9 12l2 2 4-4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            <span>No major risk signals popped up — evidence and agreement look solid.</span>
          </div>
        )}
      </div>
    </section>
  )
}

export default RiskSection
