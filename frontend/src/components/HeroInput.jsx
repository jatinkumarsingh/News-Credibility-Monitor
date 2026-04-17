function HeroInput({
  value,
  onChange,
  onSubmit,
  disabled,
  wordCount,
  minWords,
  modeLabel,
  isInputTooShort,
}) {
  const remainingWords = Math.max(minWords - wordCount, 0)

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-6 rounded-[44px] bg-gradient-to-br from-rose-200/50 via-amber-100/50 to-sky-200/50 blur-2xl" />
      <form
        onSubmit={onSubmit}
        className="relative overflow-hidden rounded-[36px] border border-white/80 bg-white/80 p-4 shadow-[0_30px_80px_-30px_rgba(244,114,182,0.45),0_14px_40px_-16px_rgba(125,211,252,0.4)] backdrop-blur-2xl sm:p-5"
      >
        <div className="rounded-[30px] border border-white/70 bg-gradient-to-br from-white via-rose-50/40 to-sky-50/40 p-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-gradient-to-br from-rose-400 to-fuchsia-500 shadow-[0_0_18px_rgba(244,114,182,0.9)]" />
              {modeLabel}
            </div>
            <div className="rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-600">
              🖊 {wordCount} words
            </div>
          </div>

          <textarea
            value={value}
            disabled={disabled}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Paste a story and let's investigate together ✨ — a news article, a thread, a detailed claim..."
            className="min-h-[220px] w-full resize-none border-none bg-transparent text-sm leading-7 text-slate-800 outline-none placeholder:text-slate-400 sm:min-h-[250px] sm:text-base"
          />

          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="text-sm text-slate-700">🍯 Longer articles = better vibes. Give us enough context to cross-check the evidence.</p>
              <p className={`mt-1 text-xs font-medium ${isInputTooShort ? 'text-orange-500' : 'text-slate-500'}`}>
                {isInputTooShort
                  ? `Just ${remainingWords} more words and we're good to go!`
                  : `Minimum length: ${minWords} words.`}
              </p>
            </div>

            <button
              type="submit"
              disabled={disabled || !value.trim() || isInputTooShort}
              className={`group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-400 via-fuchsia-400 to-sky-400 px-6 py-3 text-sm font-bold text-white shadow-[0_20px_40px_-12px_rgba(244,114,182,0.6)] transition hover:scale-[1.03] hover:shadow-[0_26px_60px_-14px_rgba(244,114,182,0.7)] disabled:cursor-not-allowed disabled:bg-none disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none ${
                !disabled && value.trim() && !isInputTooShort ? 'candy-wobble' : ''
              }`}
            >
              <span>{disabled ? 'Analyzing' : 'Analyze'}</span>
              <span className="text-base transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5">{disabled ? '…' : '↗'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default HeroInput
