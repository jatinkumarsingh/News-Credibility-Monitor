import { useState } from 'react'

function ChevronIcon({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 text-[#a1a1aa] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function AccordionSection({
  title,
  description,
  meta,
  children,
  defaultOpen = false,
  id,
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <section
      aria-labelledby={`${id}-heading`}
      className="overflow-hidden rounded-2xl border border-[#262629] bg-[#151517]"
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={`${id}-content`}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[#18181b]"
      >
        <div className="min-w-0 flex-1">
          <h3
            id={`${id}-heading`}
            className="text-[14px] font-medium text-[#ececf1]"
          >
            {title}
          </h3>
          {description ? (
            <p className="mt-0.5 truncate text-[12.5px] text-[#6b6b74]">
              {description}
            </p>
          ) : null}
        </div>
        <div className="flex shrink-0 items-center gap-3">
          {meta ? (
            <span className="text-[12px] text-[#a1a1aa]">{meta}</span>
          ) : null}
          <ChevronIcon open={open} />
        </div>
      </button>

      <div
        id={`${id}-content`}
        hidden={!open}
        className="border-t border-[#262629] px-5 py-5"
      >
        {children}
      </div>
    </section>
  )
}

export default AccordionSection
