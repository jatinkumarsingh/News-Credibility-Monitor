function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3 w-3"
      aria-hidden="true"
    >
      <path d="m5 12 5 5L20 7" />
    </svg>
  )
}

function PipelineStep({ step, index, activeStepIndex, isLast }) {
  const isComplete = index < activeStepIndex
  const isActive = index === activeStepIndex
  const isPending = index > activeStepIndex

  const statusLabel = isComplete ? 'Complete' : isActive ? 'Processing' : 'Pending'

  return (
    <div className="relative flex gap-4 pb-6 last:pb-0">
      {!isLast ? (
        <span
          aria-hidden="true"
          className={`absolute left-[11px] top-[26px] w-px transition-colors duration-500 ${
            isComplete ? 'bg-[#3a4a48]' : 'bg-[#262629]'
          }`}
          style={{ height: 'calc(100% - 20px)' }}
        />
      ) : null}

      <div
        className={`relative z-10 mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
          isComplete
            ? 'border-[#3a4a48] bg-[#1a2422] text-[#7aa88a]'
            : isActive
              ? 'border-[#3a4a48] bg-[#1a2422] text-[#6ba5a1]'
              : 'border-[#262629] bg-[#151517] text-[#6b6b74]'
        }`}
      >
        {isComplete ? (
          <CheckIcon />
        ) : isActive ? (
          <span className="pulse-soft h-1.5 w-1.5 rounded-full bg-[#6ba5a1]" />
        ) : (
          <span className="h-1.5 w-1.5 rounded-full bg-[#3a3a3f]" />
        )}
      </div>

      <div className="flex-1 pt-0 -translate-y-0.5">
        <div className="flex items-center justify-between gap-3">
          <p
            className={`text-[14px] font-medium transition-colors ${
              isPending ? 'text-[#6b6b74]' : 'text-[#ececf1]'
            }`}
          >
            {step.title}
          </p>
          <span
            className={`text-[11px] font-medium uppercase tracking-wider ${
              isComplete
                ? 'text-[#7aa88a]'
                : isActive
                  ? 'text-[#6ba5a1]'
                  : 'text-[#6b6b74]'
            }`}
          >
            {statusLabel}
          </span>
        </div>
        <p className="mt-1 text-[13px] leading-6 text-[#a1a1aa]">{step.subtext}</p>
      </div>
    </div>
  )
}

export default PipelineStep
