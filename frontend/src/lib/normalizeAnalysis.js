function cleanText(value, fallback) {
  const text = typeof value === 'string' ? value.trim() : ''
  return text || fallback
}

function normalizeVerdict(value) {
  const verdict = cleanText(value, 'UNKNOWN').toUpperCase()

  if (verdict.includes('REAL')) {
    return 'REAL'
  }

  if (verdict.includes('FAKE')) {
    return 'FAKE'
  }

  return 'UNKNOWN'
}

function toNumber(value, fallback = 0) {
  const parsed = Number.parseFloat(String(value ?? '').replace(/[^\d.]/g, ''))
  return Number.isFinite(parsed) ? parsed : fallback
}

function formatConfidence(value) {
  return `${Math.round(toNumber(value))}%`
}

function toSentences(text, count = 2) {
  const normalized = cleanText(text, '')

  if (!normalized) {
    return ''
  }

  const sentences = normalized
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)

  if (sentences.length === 0) {
    return normalized
  }

  return sentences.slice(0, count).join(' ')
}

function buildAgreementDescription(level, realVotes, fakeVotes) {
  const alignedCount = Math.max(realVotes, fakeVotes)

  if (level === 'High') {
    return `Agreement: High (${alignedCount}/3 agents aligned)`
  }

  if (level === 'Medium') {
    return 'Agreement: Medium (2/3 agents aligned with one dissenting vote)'
  }

  return 'Agreement: Low (the agents were split or uncertain)'
}

const AGENT_NAMES = {
  A: 'Agent A',
  B: 'Agent B',
  C: 'Agent C',
}

function normalizeAgent(agent, id) {
  const reasoning = cleanText(agent?.reasoning, 'No detailed reasoning was returned for this agent.')

  return {
    id,
    name: AGENT_NAMES[id] || `Agent ${id}`,
    verdict: normalizeVerdict(agent?.verdict),
    confidence: toNumber(agent?.confidence),
    confidenceLabel: formatConfidence(agent?.confidence),
    shortReasoning: toSentences(reasoning, 2),
    reasoning,
  }
}

export function normalizeAnalysisResult(payload, mode = 'agentic') {
  if (!payload || typeof payload !== 'object') {
    throw new Error('The backend returned an unexpected response.')
  }

  if (payload.error) {
    throw new Error(payload.error)
  }

  const agents = [
    normalizeAgent(payload.agent_a, 'A'),
    normalizeAgent(payload.agent_b, 'B'),
    normalizeAgent(payload.agent_c, 'C'),
  ]

  const realVotes =
    Number(payload?.agreement?.distribution?.REAL) ||
    agents.filter((agent) => agent.verdict === 'REAL').length
  const fakeVotes =
    Number(payload?.agreement?.distribution?.FAKE) ||
    agents.filter((agent) => agent.verdict === 'FAKE').length
  const agreementLevel = cleanText(payload?.agreement?.level, 'Low')

  const consensus = cleanText(
    payload?.final?.consensus,
    'The judge combined the retrieved evidence and multi-agent reasoning to reach the final decision.',
  )
  const conflict = cleanText(
    payload?.final?.conflict,
    'No additional conflict-resolution notes were returned.',
  )

  return {
    final: {
      verdict: normalizeVerdict(payload?.final?.verdict),
      confidence: toNumber(payload?.final?.confidence),
      confidenceLabel: formatConfidence(payload?.final?.confidence),
      explanation:
        toSentences(consensus, mode === 'ml' ? 1 : 2) ||
        toSentences(conflict, 2),
      dominantAgent: cleanText(payload?.final?.dominant_agent, 'Not specified'),
      conflict,
    },
    agreement: {
      level: agreementLevel,
      description: buildAgreementDescription(agreementLevel, realVotes, fakeVotes),
      distribution: {
        REAL: realVotes,
        FAKE: fakeVotes,
      },
    },
    agents,
    evidence: {
      totalDocs: Number(payload?.rag_summary?.total_docs) || 0,
      realDocs: Number(payload?.rag_summary?.real_docs) || 0,
      fakeDocs: Number(payload?.rag_summary?.fake_docs) || 0,
      previews: Array.isArray(payload?.rag_summary?.previews)
        ? payload.rag_summary.previews.filter(Boolean).slice(0, 2)
        : [],
    },
    riskFactors: Array.isArray(payload?.risk_factors)
      ? payload.risk_factors.filter(Boolean)
      : [],
    debug: {
      mlSignal: cleanText(payload?.ml_signal, 'Unavailable'),
    },
  }
}
