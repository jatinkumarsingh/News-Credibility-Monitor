const AGENT_STYLES = {
  A: {
    label: 'Conservative',
    initial: 'A',
    accent: 'text-[#7FB3D5]',
    chip: 'border-[#3a4a58] bg-[#1a2430] text-[#a8c4dc]',
    tileBorder: 'border-[#3a4a58]',
    tileBg: 'bg-[#1a2430]',
  },
  B: {
    label: 'Skeptical',
    initial: 'B',
    accent: 'text-[#c4a06a]',
    chip: 'border-[#3a2f20] bg-[#241e18] text-[#e0c89a]',
    tileBorder: 'border-[#3a2f20]',
    tileBg: 'bg-[#241e18]',
  },
  C: {
    label: 'Neutral',
    initial: 'C',
    accent: 'text-[#9FD8C9]',
    chip: 'border-[#2a3a38] bg-[#1a2a2a] text-[#9FD8C9]',
    tileBorder: 'border-[#2a3a38]',
    tileBg: 'bg-[#1a2a2a]',
  },
}

function AgentCard({ agent }) {
  const style = AGENT_STYLES[agent.id] || AGENT_STYLES.C
  const verdictTone =
    agent.verdict === 'REAL'
      ? 'text-[#7aa88a]'
      : agent.verdict === 'FAKE'
        ? 'text-[#c97370]'
        : 'text-[#a8b8e0]'

  return (
    <article className="group relative overflow-hidden rounded-[28px] border border-[#3a3a42] bg-gradient-to-b from-[#2a2a30]/95 to-[#1f1f23]/95 p-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.55)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-[#5a7a95]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#9FD8C9]/30 to-transparent"
      />
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${style.tileBorder} ${style.tileBg} font-mono text-base font-semibold ${style.accent}`}
          >
            {style.initial}
          </div>
          <div>
            <p className="text-[11px] font-semibold tracking-[0.24em] text-[#6b6b74] uppercase">
              {agent.name}
            </p>
            <p className={`mt-1 text-[13px] font-semibold ${style.accent}`}>{style.label}</p>
          </div>
        </div>

        <div
          className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${style.chip}`}
        >
          {agent.confidenceLabel}
        </div>
      </div>

      <p className={`mt-5 text-3xl font-bold tracking-tight ${verdictTone}`}>{agent.verdict}</p>
      <p className="mt-3 text-[14px] leading-7 text-[#a1a1aa]">{agent.shortReasoning}</p>

      <details className="group/details mt-5 rounded-2xl border border-[#262629] bg-[#1c1c1f] p-4">
        <summary className="flex cursor-pointer list-none items-center gap-2 text-[13px] font-semibold text-[#a1a1aa] transition hover:text-[#ececf1]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5 transition-transform duration-200 group-open/details:rotate-90"
            aria-hidden="true"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
          <span>Read full reasoning</span>
        </summary>
        <p className="mt-3 text-[13px] leading-7 text-[#a1a1aa]">{agent.reasoning}</p>
      </details>
    </article>
  )
}

function AgentSection({ agents, mode }) {
  return (
    <section>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5 text-[#E0A8C8]"
              aria-hidden="true"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <p className="text-[11px] font-semibold tracking-[0.24em] text-[#E0A8C8] uppercase">
              Agent Perspectives
            </p>
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#ececf1] sm:text-3xl">
            {mode === 'agentic'
              ? 'Three reasoning agents weigh in'
              : 'Agents cross-check the classifier'}
          </h2>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </section>
  )
}

export default AgentSection
