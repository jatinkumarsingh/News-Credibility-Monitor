function RiskList({ riskFactors }) {
  const hasRisks = riskFactors && riskFactors.length > 0

  if (!hasRisks) {
    return (
      <p className="rounded-xl border border-[#2a3a38] bg-[#1a2422]/60 px-4 py-3 text-[13px] leading-6 text-[#7aa88a]">
        No notable risk signals detected.
      </p>
    )
  }

  return (
    <ul className="space-y-2">
      {riskFactors.map((risk) => (
        <li
          key={risk}
          className="flex items-start gap-3 rounded-xl border border-[#3a2525] bg-[#241818]/50 px-4 py-2.5 text-[13px] leading-6 text-[#d4a8a6]"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-[3px] h-3.5 w-3.5 shrink-0 text-[#c97370]"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4" />
            <path d="M12 16h.01" />
          </svg>
          <span>{risk}</span>
        </li>
      ))}
    </ul>
  )
}

export default RiskList
