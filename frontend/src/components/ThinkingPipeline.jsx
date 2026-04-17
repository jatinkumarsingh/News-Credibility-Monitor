function ThinkingDots() {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#9FD8C9] [animation-delay:-0.3s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#9FD8C9] [animation-delay:-0.15s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#9FD8C9]" />
    </span>
  )
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path d="m5 12 5 5L20 7" />
    </svg>
  )
}

function ProviderBadge({ provider }) {
  const styles = {
    Groq: 'border-[#c97a3f]/40 bg-[#2a1f18] text-[#f5a872]',
    NVIDIA: 'border-[#7aa88a]/40 bg-[#1a2420] text-[#9FD8C9]',
    'scikit-learn': 'border-[#7a8acb]/40 bg-[#1a1f2a] text-[#a8b8e0]',
    'Vector Store': 'border-[#c09a6a]/40 bg-[#24201a] text-[#e0c89a]',
  }
  const cls = styles[provider] || 'border-[#3a3a42] bg-[#1d1d21] text-[#a1a1aa]'
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${cls}`}
    >
      {provider}
    </span>
  )
}

function StepBox({ step, index, activeStepIndex, total }) {
  const isComplete = index < activeStepIndex
  const isActive = index === activeStepIndex
  const isPending = index > activeStepIndex

  const label = typeof step === 'string' ? step : step.label
  const model = typeof step === 'string' ? null : step.model
  const provider = typeof step === 'string' ? null : step.provider

  const statusLabel = isComplete ? 'Complete' : isActive ? 'Thinking' : 'Queued'

  return (
    <div
      className={`group/step relative overflow-hidden rounded-2xl border p-4 transition-all duration-500 ${
        isActive
          ? 'border-[#6BAAA5]/50 bg-gradient-to-br from-[#2a2a30]/90 to-[#242428]/90 shadow-[0_12px_40px_-12px_rgba(127,179,213,0.35)]'
          : isComplete
            ? 'border-[#3a4a48]/80 bg-[#242a28]/70'
            : 'border-[#2a2a30] bg-[#1d1d21]/60'
      }`}
    >
      {isActive ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-r from-[#7FB3D5]/20 via-[#9FD8C9]/25 to-[#E0A8C8]/20 opacity-70 blur-lg"
        />
      ) : null}

      <div className="relative flex items-start gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
            isComplete
              ? 'border-[#3a4a48] bg-[#1a2422] text-[#7aa88a]'
              : isActive
                ? 'border-[#6BAAA5]/60 bg-[#1a2a2f] text-[#9FD8C9]'
                : 'border-[#2a2a30] bg-[#18181b] text-[#6b6b74]'
          }`}
        >
          {isComplete ? (
            <CheckIcon />
          ) : isActive ? (
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#9FD8C9] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#9FD8C9]" />
            </span>
          ) : (
            <span className="text-[11px] font-semibold tabular-nums">
              {String(index + 1).padStart(2, '0')}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3">
            <p
              className={`text-[14px] font-semibold transition-colors ${
                isPending ? 'text-[#6b6b74]' : 'text-[#ececf1]'
              }`}
            >
              {label}
            </p>
            <span
              className={`flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.18em] ${
                isComplete
                  ? 'text-[#7aa88a]'
                  : isActive
                    ? 'text-[#9FD8C9]'
                    : 'text-[#5a5a64]'
              }`}
            >
              {isActive ? <ThinkingDots /> : null}
              {statusLabel}
            </span>
          </div>

          {provider ? (
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <ProviderBadge provider={provider} />
              <span className="font-mono text-[11px] text-[#8a8a94]">{model}</span>
            </div>
          ) : null}

          {isActive ? (
            <div className="mt-3 space-y-1.5">
              <div className="h-1 w-full overflow-hidden rounded-full bg-[#2a2a30]">
                <div className="h-full w-1/2 animate-[slide_1.4s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-[#7FB3D5] via-[#9FD8C9] to-[#E0A8C8]" />
              </div>
              <p className="text-[12px] leading-5 text-[#8a8a94]">
                Analyzing signals and reasoning through context…
              </p>
            </div>
          ) : isComplete ? (
            <p className="mt-1 text-[12px] leading-5 text-[#7a8a84]">
              Finished and handed off to the next stage.
            </p>
          ) : (
            <p className="mt-1 text-[12px] leading-5 text-[#5a5a64]">
              Waiting for the previous stage to complete.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function ThinkingPipeline({ title, description, steps, activeStepIndex }) {
  const total = steps.length
  const progress = Math.min(activeStepIndex, total)
  const percent = total > 0 ? Math.round((progress / total) * 100) : 0
  const hasFinished = activeStepIndex >= total

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-2 rounded-[32px] bg-gradient-to-r from-[#7FB3D5]/20 via-[#9FD8C9]/25 to-[#E0A8C8]/20 opacity-60 blur-2xl"
      />

      <div className="relative overflow-hidden rounded-[28px] border border-[#3a3a42] bg-gradient-to-b from-[#2a2a30]/95 to-[#1f1f23]/95 p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#9FD8C9]/50 to-transparent"
        />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-[#6BAAA5]/40 bg-[#1a2a2f]">
              <span className="absolute inset-0 animate-pulse rounded-2xl bg-[#9FD8C9]/10" />
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="relative h-5 w-5 text-[#9FD8C9]"
                aria-hidden="true"
              >
                <path d="M12 2a4 4 0 0 0-4 4v1a4 4 0 0 0-2 7.5A4 4 0 0 0 9 22h6a4 4 0 0 0 3-7.5A4 4 0 0 0 16 7V6a4 4 0 0 0-4-4Z" />
                <path d="M12 12v4" />
                <path d="M9 15h6" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-semibold tracking-[0.24em] text-[#9FD8C9] uppercase">
                {hasFinished ? 'Finalizing' : 'Thinking'}
              </p>
              <h2 className="mt-1 text-xl font-bold text-[#ececf1] sm:text-2xl">
                {title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <div className="flex items-center gap-2 rounded-full border border-[#3a3a42] bg-[#1d1d21]/80 px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#9FD8C9] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#9FD8C9]" />
              </span>
              <span className="text-[11px] font-medium text-[#a1a1aa] tabular-nums">
                Step {Math.min(progress + (hasFinished ? 0 : 1), total)} / {total}
              </span>
            </div>
            <div className="rounded-full border border-[#3a3a42] bg-[#1d1d21]/80 px-3 py-1.5 text-[11px] font-medium text-[#a1a1aa] tabular-nums">
              {percent}%
            </div>
          </div>
        </div>

        <p className="mt-4 max-w-2xl text-[13px] leading-6 text-[#a1a1aa]">{description}</p>

        <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-[#1d1d21]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#7FB3D5] via-[#9FD8C9] to-[#E0A8C8] transition-all duration-500 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {steps.map((step, index) => (
            <StepBox
              key={`step-${index}`}
              step={step}
              index={index}
              activeStepIndex={activeStepIndex}
              total={total}
            />
          ))}
        </div>

        {hasFinished ? (
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-[#6BAAA5]/40 bg-gradient-to-r from-[#1a2a2f] to-[#242a28] px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#6BAAA5]/50 bg-[#1a2a2f] text-[#9FD8C9]">
              <CheckIcon />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#ececf1]">
                All agents have weighed in
              </p>
              <p className="text-[12px] text-[#a1a1aa]">
                Assembling the final verdict for you…
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default ThinkingPipeline
