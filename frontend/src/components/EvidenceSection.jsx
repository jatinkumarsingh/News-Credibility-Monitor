function EvidenceSection({ evidence, mode }) {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-[#3a3a42] bg-gradient-to-b from-[#2a2a30]/95 to-[#1f1f23]/95 p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#7FB3D5]/40 to-transparent"
      />
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
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
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <p className="text-[11px] font-semibold tracking-[0.24em] text-[#7FB3D5] uppercase">
              Evidence
            </p>
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#ececf1] sm:text-3xl">
            {mode === 'agentic' ? 'What the knowledge base dug up' : 'Supporting retrieval context'}
          </h2>
        </div>
        <p className="text-[12px] text-[#6b6b74]">Snippets trimmed for quick review.</p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#262629] bg-[#1c1c1f] p-4">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-[#7FB3D5] uppercase">
            Documents
          </p>
          <p className="mt-2 text-3xl font-bold text-[#ececf1] tabular-nums">
            {evidence.totalDocs}
          </p>
        </div>
        <div className="rounded-2xl border border-[#262629] bg-[#1c1c1f] p-4">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-[#7aa88a] uppercase">
            Real
          </p>
          <p className="mt-2 text-3xl font-bold text-[#ececf1] tabular-nums">
            {evidence.realDocs}
          </p>
        </div>
        <div className="rounded-2xl border border-[#262629] bg-[#1c1c1f] p-4">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-[#c97370] uppercase">
            Fake
          </p>
          <p className="mt-2 text-3xl font-bold text-[#ececf1] tabular-nums">
            {evidence.fakeDocs}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {evidence.previews.length > 0 ? (
          evidence.previews.map((preview, index) => (
            <div
              key={`${preview}-${index}`}
              className="flex items-start gap-3 rounded-2xl border border-[#262629] bg-[#151517]/80 p-4 text-[13px] leading-7 text-[#a1a1aa]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-1 h-3.5 w-3.5 shrink-0 text-[#6b6b74]"
                aria-hidden="true"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
              </svg>
              <span>{preview}</span>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-[#3a3a42] bg-[#151517]/60 p-4 text-[13px] leading-7 text-[#6b6b74]">
            No evidence snippets came back this round.
          </div>
        )}
      </div>
    </section>
  )
}

export default EvidenceSection
