function AgreementSection({ agreement, mode, mlSignal }) {
  const tone =
    agreement.level === 'High'
      ? {
          text: 'text-[#7aa88a]',
          accent: 'text-[#7aa88a]',
          rowBg: 'bg-[#182420]',
          rowBorder: 'border-[#2a3a30]',
        }
      : agreement.level === 'Medium'
        ? {
            text: 'text-[#c4a06a]',
            accent: 'text-[#c4a06a]',
            rowBg: 'bg-[#241e18]',
            rowBorder: 'border-[#3a2f20]',
          }
        : {
            text: 'text-[#c97370]',
            accent: 'text-[#c97370]',
            rowBg: 'bg-[#241818]',
            rowBorder: 'border-[#3a2525]',
          }

  return (
    <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="relative overflow-hidden rounded-[28px] border border-[#3a3a42] bg-gradient-to-b from-[#2a2a30]/95 to-[#1f1f23]/95 p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#9FD8C9]/40 to-transparent"
        />
        <div className="flex items-center gap-2">
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
          <p className="text-[11px] font-semibold tracking-[0.24em] text-[#9FD8C9] uppercase">
            Agreement Summary
          </p>
        </div>
        <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={`text-4xl font-bold tracking-tight ${tone.text}`}>{agreement.level}</p>
            <p className="mt-3 max-w-xl text-[14px] leading-7 text-[#a1a1aa]">
              {agreement.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:min-w-[220px]">
            <div className="rounded-2xl border border-[#262629] bg-[#1c1c1f] p-4">
              <p className="text-[11px] font-semibold tracking-[0.2em] text-[#7aa88a] uppercase">
                Real
              </p>
              <p className="mt-2 text-2xl font-bold text-[#ececf1] tabular-nums">
                {agreement.distribution.REAL}
              </p>
            </div>
            <div className="rounded-2xl border border-[#262629] bg-[#1c1c1f] p-4">
              <p className="text-[11px] font-semibold tracking-[0.2em] text-[#c97370] uppercase">
                Fake
              </p>
              <p className="mt-2 text-2xl font-bold text-[#ececf1] tabular-nums">
                {agreement.distribution.FAKE}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[28px] border border-[#3a3a42] bg-gradient-to-b from-[#2a2a30]/95 to-[#1f1f23]/95 p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#7FB3D5]/40 to-transparent"
        />
        <div className="flex items-center gap-2">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5 text-[#7FB3D5]"
            aria-hidden="true"
          >
            <path d="M2 12h3" />
            <path d="M19 12h3" />
            <path d="M12 2v3" />
            <path d="M12 19v3" />
            <circle cx="12" cy="12" r="4" />
          </svg>
          <p className="text-[11px] font-semibold tracking-[0.24em] text-[#7FB3D5] uppercase">
            {mode === 'agentic' ? 'Model Signal' : 'Classifier Signal'}
          </p>
        </div>
        <p className="mt-5 text-2xl font-bold tracking-tight text-[#ececf1]">{mlSignal}</p>
        <p className="mt-3 text-[14px] leading-7 text-[#a1a1aa]">
          {mode === 'agentic'
            ? 'The judge weighs this ML signal against retrieval context and the three reasoning agents.'
            : 'We lead with the classifier here — the agents and retrieval still back it up below.'}
        </p>
      </div>
    </section>
  )
}

export default AgreementSection
