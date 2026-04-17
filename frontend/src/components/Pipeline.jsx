import PipelineStep from './PipelineStep'

function Pipeline({ steps, activeStepIndex }) {
  return (
    <section
      aria-label="Processing pipeline"
      className="fade-in rounded-2xl border border-[#262629] bg-[#151517] p-6"
    >
      <div className="mb-6 flex items-center gap-2">
        <span className="pulse-soft h-1.5 w-1.5 rounded-full bg-[#6ba5a1]" />
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#a1a1aa]">
          Processing
        </p>
      </div>

      <div className="flex flex-col">
        {steps.map((step, index) => (
          <PipelineStep
            key={step.title}
            step={step}
            index={index}
            activeStepIndex={activeStepIndex}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>
    </section>
  )
}

export default Pipeline
