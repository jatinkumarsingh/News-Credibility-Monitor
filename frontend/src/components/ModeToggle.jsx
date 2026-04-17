const MODES = [
  { id: 'agentic', label: 'Agentic Analysis' },
  { id: 'ml', label: 'Classical ML' },
]

function ModeToggle({ mode, onModeChange, disabled = false }) {
  return (
    <div
      role="tablist"
      aria-label="Analysis mode"
      className="inline-flex items-center rounded-full border border-[#262629] bg-[#151517] p-1"
    >
      {MODES.map((item) => {
        const isActive = item.id === mode
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={disabled}
            onClick={() => onModeChange(item.id)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 sm:text-[13px] ${
              isActive
                ? 'bg-[#262629] text-[#ececf1] shadow-sm'
                : 'text-[#a1a1aa] hover:text-[#ececf1]'
            } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}

export default ModeToggle
