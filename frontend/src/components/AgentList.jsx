import { useState } from 'react'

const AGENT_META = {
  A: { label: 'Conservative', description: 'Trusts ML and retrieved evidence' },
  B: { label: 'Skeptical', description: 'Challenges evidence quality and completeness' },
  C: { label: 'Neutral', description: 'Balanced, objective weighting' },
}

function verdictClasses(verdict) {
  if (verdict === 'REAL') {
    return 'border-[#3a4a48] bg-[#1a2422] text-[#7aa88a]'
  }
  if (verdict === 'FAKE') {
    return 'border-[#4a2f2f] bg-[#241818] text-[#c97370]'
  }
  return 'border-[#3f3522] bg-[#241e13] text-[#c4a06a]'
}

function AgentItem({ agent, index, isLast }) {
  const [expanded, setExpanded] = useState(false)
  const meta = AGENT_META[agent.id] || { label: 'Analyst', description: '' }
  const hasMoreReasoning =
    agent.reasoning &&
    agent.shortReasoning &&
    agent.reasoning.length > agent.shortReasoning.length

  return (
    <div className={`pb-5 ${isLast ? '' : 'border-b border-[#262629] mb-5'}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md border border-[#262629] bg-[#1c1c1f] text-[11px] font-semibold text-[#a1a1aa]">
              {agent.id}
            </span>
            <p className="text-[14px] font-medium text-[#ececf1]">
              {meta.label}
            </p>
            <span className="text-[12px] text-[#6b6b74]">· {agent.name}</span>
          </div>
          <p className="mt-1 text-[12.5px] text-[#6b6b74]">{meta.description}</p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span
            className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${verdictClasses(agent.verdict)}`}
          >
            {agent.verdict}
          </span>
          <span className="text-[12px] font-medium tabular-nums text-[#a1a1aa]">
            {agent.confidenceLabel}
          </span>
        </div>
      </div>

      <p className="mt-3 text-[13.5px] leading-7 text-[#a1a1aa]">
        {expanded ? agent.reasoning : agent.shortReasoning}
      </p>

      {hasMoreReasoning ? (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-2 text-[12px] font-medium text-[#6ba5a1] transition-colors hover:text-[#8bbfba]"
        >
          {expanded ? 'Show less' : 'Show full reasoning'}
        </button>
      ) : null}
    </div>
  )
}

function AgentList({ agents }) {
  if (!agents || agents.length === 0) {
    return (
      <p className="text-[13.5px] text-[#6b6b74]">
        No agent responses were returned.
      </p>
    )
  }

  return (
    <div>
      {agents.map((agent, index) => (
        <AgentItem
          key={agent.id}
          agent={agent}
          index={index}
          isLast={index === agents.length - 1}
        />
      ))}
    </div>
  )
}

export default AgentList
