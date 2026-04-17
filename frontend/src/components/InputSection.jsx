function InputSection({
  value,
  onChange,
  onSubmit,
  disabled,
  wordCount,
  minWords,
  isInputTooShort,
  mode,
  onModeChange,
}) {
  const canSubmit = !disabled && value.trim() && !isInputTooShort
  const charCount = value.length

  const modeOptions = [
    { id: 'agentic', label: 'Agentic Analysis' },
    { id: 'ml', label: 'Classical ML' },
  ]

  return (
    <div className="group/input relative">
      {/* Soft aurora glow behind the input */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-r from-[#3A5F8F]/30 via-[#6BAAA5]/25 to-[#7A5AA8]/30 opacity-60 blur-xl transition-opacity duration-500 group-focus-within/input:opacity-90"
      />

      <form
        onSubmit={onSubmit}
        className="group relative rounded-2xl border border-[#3a3a42] bg-gradient-to-b from-[#2a2a30]/95 to-[#242428]/95 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 focus-within:border-[#5a7a95] focus-within:shadow-[0_25px_80px_-20px_rgba(127,179,213,0.3)]"
      >
        {/* Top accent line */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#6BAAA5]/40 to-transparent"
        />

        <div className="flex items-center gap-2 border-b border-[#3a3a42]/60 px-5 pt-4 pb-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#33333a]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5 text-[#6BAAA5]"
              aria-hidden="true"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
              <path d="M9 13h6" />
              <path d="M9 17h4" />
            </svg>
          </span>
          <span className="text-[12px] font-medium text-[#a1a1aa]">
            Article to analyze
          </span>
          <span className="ml-auto flex items-center gap-1.5 text-[11px] text-[#6b6b74]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7aa88a]" />
            Ready
          </span>
        </div>

        <textarea
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Paste a news article here to analyze its credibility..."
          className="min-h-[200px] w-full resize-none bg-transparent px-5 py-4 text-[15px] leading-7 text-[#ececf1] outline-none placeholder:text-[#5c5c66] disabled:cursor-not-allowed disabled:opacity-60"
        />

        <div className="flex items-center justify-between gap-3 border-t border-[#3a3a42]/60 bg-[#1f1f23]/40 px-4 py-3">
          <div className="flex items-center gap-3 text-xs text-[#8a8a94]">
            <span className="inline-flex items-center gap-1.5">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3 w-3 text-[#6b6b74]"
                aria-hidden="true"
              >
                <path d="M4 7V4h16v3" />
                <path d="M9 20h6" />
                <path d="M12 4v16" />
              </svg>
              <span className="tabular-nums">
                {wordCount} {wordCount === 1 ? 'word' : 'words'}
              </span>
            </span>
            <span className="h-3 w-px bg-[#262629]" />
            <span className="tabular-nums">{charCount.toLocaleString()} chars</span>
            {isInputTooShort ? (
              <>
                <span className="h-3 w-px bg-[#262629]" />
                <span className="inline-flex items-center gap-1 text-[#c4a06a]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4" />
                    <path d="M12 16h.01" />
                  </svg>
                  Minimum {minWords} words
                </span>
              </>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            <div
              role="tablist"
              aria-label="Analysis mode"
              className="inline-flex items-center gap-1 rounded-lg border border-[#3a3a42] bg-[#2a2a30]/80 p-0.5 backdrop-blur-sm"
            >
              {modeOptions.map((option) => {
                const isActive = mode === option.id
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    disabled={disabled}
                    onClick={() => onModeChange && onModeChange(option.id)}
                    className={`rounded-md px-3 py-1 text-[12px] font-medium transition-all duration-150 disabled:cursor-not-allowed ${
                      isActive
                        ? 'bg-[#3f3f47] text-[#ececf1] shadow-sm'
                        : 'text-[#a1a1aa] hover:text-[#ececf1]'
                    }`}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-[13px] font-semibold transition-all duration-200 ${
                canSubmit
                  ? 'bg-gradient-to-b from-[#ffffff] to-[#d4d4d8] text-[#0d0d0f] shadow-[0_4px_14px_-2px_rgba(255,255,255,0.25)] hover:shadow-[0_6px_18px_-2px_rgba(255,255,255,0.35)] hover:brightness-105 active:brightness-95'
                  : 'cursor-not-allowed bg-[#262629] text-[#6b6b74]'
              }`}
            >
              {disabled ? (
                <>
                  <svg
                    className="h-3.5 w-3.5 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" opacity="0.25" />
                    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span>Analyzing</span>
                </>
              ) : (
                <>
                  <span>Analyze</span>
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default InputSection
