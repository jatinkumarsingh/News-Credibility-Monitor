function EvidenceList({ evidence }) {
  const { totalDocs = 0, realDocs = 0, fakeDocs = 0, previews = [] } = evidence || {}

  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-[#262629] bg-[#1c1c1f] px-3 py-3">
          <p className="text-[11px] font-medium uppercase tracking-wider text-[#6b6b74]">
            Documents
          </p>
          <p className="mt-1.5 text-[20px] font-semibold tabular-nums text-[#ececf1]">
            {totalDocs}
          </p>
        </div>
        <div className="rounded-xl border border-[#262629] bg-[#1c1c1f] px-3 py-3">
          <p className="text-[11px] font-medium uppercase tracking-wider text-[#7aa88a]">
            Real
          </p>
          <p className="mt-1.5 text-[20px] font-semibold tabular-nums text-[#ececf1]">
            {realDocs}
          </p>
        </div>
        <div className="rounded-xl border border-[#262629] bg-[#1c1c1f] px-3 py-3">
          <p className="text-[11px] font-medium uppercase tracking-wider text-[#c97370]">
            Fake
          </p>
          <p className="mt-1.5 text-[20px] font-semibold tabular-nums text-[#ececf1]">
            {fakeDocs}
          </p>
        </div>
      </div>

      {previews.length > 0 ? (
        <div className="mt-4 space-y-2">
          {previews.map((preview, index) => (
            <div
              key={`${preview}-${index}`}
              className="rounded-xl border border-[#262629] bg-[#1c1c1f] px-4 py-3 text-[13px] leading-6 text-[#a1a1aa]"
            >
              {preview}
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 rounded-xl border border-dashed border-[#262629] bg-[#1c1c1f]/40 px-4 py-3 text-[13px] text-[#6b6b74]">
          No evidence snippets were returned for this query.
        </p>
      )}
    </div>
  )
}

export default EvidenceList
