function VerdictIcon({ verdict }) {
  if (verdict === 'REAL') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    )
  }
  if (verdict === 'FAKE') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    )
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}

function VerdictCard({ final, agreement, mode, mlSignal }) {
  const isReal = final.verdict === 'REAL'
  const isFake = final.verdict === 'FAKE'

  const tone = isReal
    ? {
        label: 'Likely credible',
        accent: 'text-[#7aa88a]',
        badge: 'border-[#3a4a48] bg-[#1a2422] text-[#7aa88a]',
        border: 'border-[#2a3a38]',
        bar: 'bg-[#7aa88a]',
      }
    : isFake
      ? {
          label: 'Likely misleading',
          accent: 'text-[#c97370]',
          badge: 'border-[#4a2f2f] bg-[#241818] text-[#c97370]',
          border: 'border-[#3a2525]',
          bar: 'bg-[#c97370]',
        }
      : {
          label: 'Uncertain',
          accent: 'text-[#c4a06a]',
          badge: 'border-[#3f3522] bg-[#241e13] text-[#c4a06a]',
          border: 'border-[#2f2922]',
          bar: 'bg-[#c4a06a]',
        }

  const confidenceValue = Math.max(0, Math.min(100, Number(final.confidence) || 0))

  const alignedCount = Math.max(
    Number(agreement?.distribution?.REAL) || 0,
    Number(agreement?.distribution?.FAKE) || 0,
  )
  const agreementText = agreement?.level === 'High'
    ? `${alignedCount} of 3 agents agree`
    : agreement?.level === 'Medium'
      ? `${alignedCount} of 3 agents agree`
      : 'Agents split on verdict'

  return (
    <section
      aria-label="Final verdict"
      className={`fade-in rounded-2xl border ${tone.border} bg-[#151517] p-7 sm:p-8`}
    >
      <div className="flex items-center gap-2">
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider ${tone.badge}`}>
          <VerdictIcon verdict={final.verdict} />
          {final.verdict}
        </span>
        <span className="text-[11px] font-medium uppercase tracking-wider text-[#6b6b74]">
          {mode === 'agentic' ? 'Agentic synthesis' : 'ML-led review'}
        </span>
      </div>

      <h2 className="mt-5 text-[28px] font-semibold tracking-tight text-[#ececf1] sm:text-[32px]">
        {tone.label}
      </h2>

      <p className="mt-3 max-w-2xl text-[14px] leading-7 text-[#a1a1aa] sm:text-[15px]">
        {final.explanation}
      </p>

      <div className="mt-7 flex flex-col gap-4">
        <div className="flex items-center justify-between text-[12px]">
          <span className="font-medium uppercase tracking-wider text-[#6b6b74]">
            Confidence
          </span>
          <span className={`font-semibold tabular-nums ${tone.accent}`}>
            {final.confidenceLabel}
          </span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-[#1c1c1f]">
          <div
            className={`h-full rounded-full ${tone.bar} transition-all duration-700 ease-out`}
            style={{ width: `${confidenceValue}%` }}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#262629] pt-5 text-[12px] text-[#a1a1aa]">
        <div className="flex items-center gap-1.5">
          <span className="text-[#6b6b74]">Agreement</span>
          <span className="text-[#ececf1]">{agreementText}</span>
        </div>
        <span className="h-3 w-px bg-[#262629]" aria-hidden="true" />
        <div className="flex items-center gap-1.5">
          <span className="text-[#6b6b74]">ML signal</span>
          <span className="text-[#ececf1] tabular-nums">{mlSignal}</span>
        </div>
      </div>
    </section>
  )
}

export default VerdictCard
