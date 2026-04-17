import ModeToggle from './ModeToggle'

function Navbar({ mode, onModeChange, disabled = false }) {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 rounded-full border border-white/70 bg-white/70 px-4 py-3 shadow-[0_20px_60px_-20px_rgba(244,114,182,0.4),0_10px_30px_-12px_rgba(125,211,252,0.3)] backdrop-blur-xl sm:px-5">
      <div className="flex items-center gap-3">
        <div className="candy-float flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/80 bg-[conic-gradient(from_120deg,#fb7185,#fbbf24,#34d399,#38bdf8,#a78bfa,#fb7185)] text-sm font-black text-white shadow-[0_10px_24px_-6px_rgba(251,113,133,0.55)]">
          <span className="rounded-full bg-white/85 px-1.5 py-0.5 text-[10px] font-black tracking-tight text-slate-900">NC</span>
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">News Credibility Monitor</p>
          <p className="text-xs text-slate-500">Your friendly fact-check buddy ✨</p>
        </div>
      </div>

      <ModeToggle mode={mode} onModeChange={onModeChange} disabled={disabled} />
    </header>
  )
}

export default Navbar
